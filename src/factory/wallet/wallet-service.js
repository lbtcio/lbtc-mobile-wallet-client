import wConfig from "./config"
import bip38 from "bip38";
import bip39 from "bip39";
import bitcoin from "bitcoinjs-lib";
import coinselect from "coinselect";
import calc from 'calculatorjs';
import bign from 'big-number';


import http from '../libs/http';
import api from "../libs/api";


var Wallet = {};
var Tool = {};
var neeet = "bitcoin";
var mainnet = 'bitcoin';
var testnet = 'testnet';


Wallet.generateMnemonic = function () {
  return Promise.resolve(bip39.generateMnemonic());
}

Wallet.getSeedHex = function (mnemonic) {
  return Promise.resolve(bip39.mnemonicToSeedHex(mnemonic))
}

Wallet.HDNodefromSeedHex = function (seedHex, network) {
  return Promise.resolve(bitcoin.HDNode.fromSeedHex(seedHex, bitcoin.networks[network]))
}

Wallet.createWalletFromMnemonic = function (mnemonic, network) {
  network == undefined ? network = neeet : network = neeet;
  let seed = bip39.mnemonicToSeed(mnemonic), 
    root = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks[network]), 
    child0 = root.derivePath("m/44'/0'/0'/0/0"), 
    prv = child0.keyPair.toWIF(), 
    addr = child0.getAddress(); 
  let walletInfo = {
    balance: 0,
    mnemonic: mnemonic,
    prv: prv,
    addr: addr,
    network: network,
    photo: Math.floor(Math.random() * 4)
  };
  return Promise.resolve(walletInfo)
}

Wallet.createWalletFromPrv = function (prv, network) {
  network == undefined ? network = neeet : network = neeet;
  try {
    bitcoin.ECPair.fromWIF(prv, bitcoin.networks[network]);
  } catch (error) {
    if (error) {
      return Promise.reject(error)
    }
  };
  let ecPair = bitcoin.ECPair.fromWIF(prv, bitcoin.networks[network]),
    addr = ecPair.getAddress(); 
  let walletInfo = {
    balance: 0,
    mnemonic: '',
    prv: prv,
    addr: addr,
    network: network,
    photo: Math.floor(Math.random() * 4)
  };
  return Promise.resolve(walletInfo)
}

Wallet.ecPairFromWIF = function (prv, network) {
  network == undefined ? network = neeet : network = neeet;
  let result = bitcoin.ECPair.fromWIF(prv, bitcoin.networks[network]);
  // return Promise.resolve(result)
  return result
}

Wallet.newTransaction = function (network) {
  let setVersion;
  if (network == undefined) {
    network = neeet;
    setVersion = '65282'
  } else {
    network = neeet;
    setVersion = '65282'
  }
  const newTx = new bitcoin.TransactionBuilder(bitcoin.networks[network]);
  newTx.setVersion(Number(setVersion));
  return Promise.resolve(newTx)
}


Wallet.queue = function (tx_list, current_wallet, data = []) {
  return new Promise((resolve) => {
    if (tx_list.length > 0) {
      let txItem = tx_list.shift();
      return new Promise((resolve) => {
        let proAllList = [];
        txItem.forEach((item, index) => {
          proAllList.push(
            http.get(api.api.gettxinfo, {
              param: item.txid,
              addr: current_wallet
            })
          );
        });
        Promise.all(proAllList).then(list => {
          let deList = [];
          deList = Wallet.parseListTx(list, current_wallet);
          resolve(deList);
        })
      }).then((res) => {
        data = data.concat(res);
        resolve(Wallet.queue(tx_list, current_wallet, data))
      })
    } else {
      resolve(data)
    }
  })
},


Wallet.parseListTx = function (listTX, current_wallet) {

  let txsList = [];

  listTX.forEach((item, index) => {
    let vin, vout, value, type, iscoinbase = false, fees = 0;
    txsList[index] = item.msg;
    for (let i = 0; i < txsList[index].vin.length; i++) {
      if (JSON.stringify(txsList[index].vin[i]).indexOf(current_wallet) >= 0) {
        vin = true;
        break
      }
    }
    for (let o = 0; o < txsList[index].vout.length; o++) {
      if (JSON.stringify(txsList[index].vout[o]).indexOf(current_wallet) >= 0) {
        vout = true;
        break
      }
    }
    if (JSON.stringify(txsList[index].vin).indexOf('coinbase') >= 0) {
      iscoinbase = true;
    }
    if (vin) {
      type = 's'; 
      let flag = true
      for (let v = 0; v < txsList[index].vout.length; v++) {
        if (JSON.stringify(txsList[index].vout[v].scriptPubKey).indexOf(current_wallet) < 0) {
          value = txsList[index].vout[v].value
          flag = false;
        }
      }
      if (flag) {
        value = txsList[index].vout[0].value
      }
    }
    if (!vin && vout) {
      type = "r"; 
      for (let v = 0; v < txsList[index].vout.length; v++) {
        if (
          JSON.stringify(txsList[index].vout[v].scriptPubKey).indexOf(
            current_wallet
          ) >= 0
        ) {
          value = txsList[index].vout[v].value;
        }
      }
    }
    txsList[index].iscoinbase = iscoinbase;
    txsList[index].type = type;
    txsList[index].value = Tool.getFullNum(value);
  });

  return txsList
}

Wallet.listUnSpent = function (listTX, current_wallet, total_height) {
  let unSpent = [];
  listTX.forEach((item, index) => {
    for (let i = 0; i < item.vout.length; i++) {
      let obj = {};
      if (item.vout[i].scriptPubKey.addresses) {
        if (item.vout[i].scriptPubKey.addresses[0] == current_wallet) {
          obj.height = item.height;
          obj.txId = item.txid;
          obj.vout = item.vout[i].n;
          obj.iscoinbase = item.iscoinbase;
          obj.address = item.vout[i].scriptPubKey.addresses[0];
          obj.scriptPubKey = item.vout[i].scriptPubKey.hex;
          obj.value = Tool.numMul(item.vout[i].value, 100000000);

          unSpent.push(obj);
        }
      }
    }
  });

  listTX.forEach((item, index) => {
    item.vin.forEach((item_v, index_v) => {
      let txid = item_v.txid;
      let vout = item_v.vout;
      for (let i = 0; i < unSpent.length; i++) {
        if (unSpent[i].txId == txid && unSpent[i].vout == vout) {
          unSpent.splice(i, 1);
          break
        }
      }
    });
  });

  let available = []
  let unavailable = [];
  let availablebalance = 0;
  let unavailablebalance = 0;

  unSpent.forEach((item, index) => {
    if (item.iscoinbase) {
      if (total_height - item.height > 100 ) {
        available.push(item);
        availablebalance = calc.add(availablebalance, item.value);
      } else {
        unavailable.push(item)
        unavailablebalance = calc.add(unavailablebalance, item.value);
      }
    } else {
      available.push(item);
      availablebalance = calc.add(availablebalance, item.value);
    }
  });

  let res = {
    available: available,
    availablebalance: calc.div(availablebalance, 100000000),
    unavailable: unavailable,
    unavailablebalance: calc.div(unavailablebalance, 100000000)
  }
  res.totalbalance = calc.add(res.availablebalance, res.unavailablebalance);

  return res

}

Wallet.addListUnSpent = function (listTX, current_wallet, total_height, UnSpent) {

  if (UnSpent.unavailable.length) {
    for (let i = 0; i < UnSpent.unavailable.length; i++) {
      const item = UnSpent.unavailable[i];
      if (total_height - item.height > 100) {
        UnSpent.available.push(item);
        UnSpent.unavailable.splice(i, 1);
        i = i - 1;
      }
    }
  }

  listTX.forEach((item, index) => {
    item.vin.forEach((item_v, index_v) => {
      let txid = item_v.txid;
      let vout = item_v.vout;

      for (let i = 0; i < UnSpent.available.length; i++) {
        if (UnSpent.available[i].txId == txid && UnSpent.available[i].vout == vout) {
          UnSpent.available.splice(i, 1);
          break
        }
      }
      for (let i = 0; i < UnSpent.unavailable.length; i++) {
        if (UnSpent.unavailable[i].txId == txid && UnSpent.unavailable[i].vout == vout) {
          UnSpent.unavailable.splice(i, 1);
          break
        }
      }

    });
  });

  let availablebalance = 0;
  UnSpent.available.forEach(item => {
    availablebalance = calc.add(availablebalance, item.value)
  });
  UnSpent.availablebalance = calc.div(availablebalance, 100000000);
  
  let unavailablebalance = 0;
  UnSpent.unavailable.forEach(item => {
    unavailablebalance = calc.add(unavailablebalance, item.value)
  });
  UnSpent.unavailablebalance = calc.div(unavailablebalance, 100000000);

  let addUnSpent = Wallet.listUnSpent(listTX, current_wallet, total_height);

  let newavailable          = addUnSpent.available.concat(UnSpent.available)
  let newavailablebalance   = calc.add(addUnSpent.availablebalance, UnSpent.availablebalance)
  let newunavailable        = addUnSpent.unavailable.concat(UnSpent.unavailable)
  let newunavailablebalance = calc.add(addUnSpent.unavailablebalance, UnSpent.unavailablebalance)
  
  let res = {
    available: newavailable,
    availablebalance: newavailablebalance,
    unavailable: newunavailable,
    unavailablebalance: newunavailablebalance
  }
  res.totalbalance = calc.add(res.availablebalance, res.unavailablebalance);
  return res;
}

Wallet.coinselect = function (utxos, targets) {
  let feeRate = wConfig.feeRate;
  let {
    inputs,
    outputs,
    fee
  } = coinselect(utxos, targets, feeRate);
  return {
    inputs: inputs,
    outputs: outputs,
    fee: fee
  }
}


Tool.getFullNum = function (num) {
  if (isNaN(num)) {
    return num
  };
  var str = '' + num;
  if (!/e/i.test(str)) {
    return num;
  };
  return (num).toFixed(18).replace(/\.?0+$/, "");
}

Tool.accMul = function(arg1,arg2) {
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

Tool.numMul = function(arg, accuracy) {
  let inte = arg.toString().split(".")[0];
  let dot  = arg.toString().split(".")[1];
  if (dot) {
    let dotNum = Number('0.' + dot);
    return ( calc.add(calc.mul(Number(inte), accuracy), calc.mul(Number(dotNum), accuracy)))
  } else {
    return calc.mul(Number(inte), accuracy)
  }
}



export default {
  Wallet,
  bip38,
  bip39,
  bitcoin
}