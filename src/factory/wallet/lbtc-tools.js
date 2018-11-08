import bs58 from 'bs58';
import bs58check from "bs58check";
import iconv from 'iconv-lite';

var LBTCtools = {};

LBTCtools.StringtoHex = function (str) {
  var val = "";
  for (var i = 0; i < str.length; i++) {
    if (val == "") {
      val = str.charCodeAt(i).toString(16);
    } else {
      val += str.charCodeAt(i).toString(16);
    }
  }
  return val;
}


LBTCtools.StringLengthProcess = function (str) {
  if (typeof (str) !== "string") {
    return false
  }

  let OP_PUSHDATA1 = '4c';
  let OP_PUSHDATA2 = '4d';

  let strLen = str.length;

  if (strLen < 0x4c) {
    let resLen = strLen;
    resLen = resLen.toString(16);

    if (resLen.length === 1) {
      resLen = '0' + resLen
    }
    return resLen;

  } else if (strLen <= 0xff) {
    let resLen = strLen;
    resLen = resLen.toString(16);

    if (resLen.length === 1) {
      resLen = '0' + resLen;
    }

    resLen = OP_PUSHDATA1 + resLen;
    return resLen;

  } else if (strLen <= 0xffff) {
    let resLen = strLen;
    resLen = resLen.toString(16);

    if (resLen.length === 3) {
      resLen = '0' + resLen;
    }

    resLen =resLen.slice(2) + resLen.slice(0,2)

    resLen = OP_PUSHDATA2 + resLen;
    return resLen;
  }
}


LBTCtools.ProBillTool = function (param) {
    param = iconv.encode(param, 'utf8');

    let tempParam = ''
    for (let p of param) {
        tempParam += p.toString(16)
    }

    let paramSub = tempParam.slice(0, tempParam.length / 2)

    let paramLen = LBTCtools.StringLengthProcess(paramSub);

    if (paramLen.length === 1 || paramLen.length === 3) {
        paramLen = '0' + paramLen
    }

    let paramRes = paramLen + tempParam;

    return paramRes
}


LBTCtools.RegForgedNode = function (name) {
  let prefix = "00000000";
  let op_code = "c0";

  name = iconv.encode(name, 'utf8');

  let temp = ''
  for (let n of name) {
    temp += n.toString(16)
  }

  let lenStr = temp.slice(0, temp.length / 2)

  let nameLen = LBTCtools.StringLengthProcess(lenStr);

  if (nameLen === false) {
    return "param is not string";
  }

  let res = nameLen + temp;

  let op_return = prefix + op_code + res;
  return op_return;
}


LBTCtools.VoteForgedNode = function (addrs,opCode) {
  if (!(addrs instanceof Array)) {
    return "param is not array";
  }
  
  if (opCode !== "c1" && opCode !== "c2"){
    return "opcode != c1 or c2";
  }

  let prefix = "00000000";
  let op_code = opCode;

  let addrCount = addrs.length;

  addrCount = addrCount.toString(16)

  if (addrCount.length === 1) {
    addrCount = '0' + addrCount;
  }

  let sLen = 40
  let Vres = "";
  for (let addr of addrs) {
    let resStr = ""
    let pubKey = bs58check.decode(addr).toString('hex').replace(/\b(0+)/gi, "");
    let pubkeyLen = pubKey.length

    let tempLen = sLen - pubkeyLen
    if(tempLen > 0){
        for (let i=1;i<=tempLen;i++){
            pubKey = '0' + pubKey
        }
        pubkeyLen = pubkeyLen + tempLen
    }

    let resLen = LBTCtools.StringLengthProcess(pubKey.slice(0, pubkeyLen / 2));

    if (resLen === false) {
      return 'array element is not string';
    }

    if (resLen.length === 1 || resLen.length === 3) {
      resLen = '0' + resLen
    }

    resStr = resLen + pubKey;
    Vres += resStr;
  }

  let fRes = prefix + op_code + addrCount + Vres
  return fRes
}


LBTCtools.RegBoardMembers = function (name,url) {
    if (arguments.length !== 2){
        return "arguments error!";
    }

    let prefix = "00000000";
    let op_code = "c3";

    //name
    name = iconv.encode(name, 'utf8');

    let temp = ''

    for (let n of name) {
        temp += n.toString(16)
    }

    let lenStr = temp.slice(0, temp.length / 2)

    let nameLen = LBTCtools.StringLengthProcess(lenStr);

    if (nameLen === false) {
        return "name is not string";
    }

    let res = nameLen + temp;

    //url
    url = iconv.encode(url, 'utf8');

    let temp2 = ''
    for (let n2 of url) {
        temp2 += n2.toString(16)
    }

    let lenStr2 = temp2.slice(0, temp2.length / 2)

    let urlLen = LBTCtools.StringLengthProcess(lenStr2);

    if (urlLen === false) {
        return "url is not string";
    }

    let res2 = urlLen + temp2;

    let op_return = prefix + op_code + res + res2;
    return op_return;
}


LBTCtools.VoteBoardMembers = function (addr,opCode) {
    if (opCode !== "c4" && opCode !== "c5"){
        return "opcode != c4 or c5";
    }

    let prefix = "00000000";
    let op_code = opCode;

    let pubKey = bs58check.decode(addr).toString('hex').replace(/\b(0+)/gi, "");
    let pubkeyLen = pubKey.length

    let sLen = 40
    let tempLen = sLen - pubkeyLen
    if(tempLen > 0){
        for (let i=1;i<=tempLen;i++){
            pubKey = '0' + pubKey
        }
        pubkeyLen = pubkeyLen + tempLen
    }

    let resLen = LBTCtools.StringLengthProcess(pubKey.slice(0, pubkeyLen / 2));
    if (resLen === false) {
        return 'array element is not string';
    }
    if (resLen.length === 1 || resLen.length === 3) {
        resLen = '0' + resLen
    }

    let resStr = resLen + pubKey;


    let fRes = prefix + op_code + resStr
    return fRes
}


LBTCtools.TableTheBill = function (title,detail,url,endtime,options) {
    let prefix = "00000000";
    let op_code = 'c6';

    let titleBill = LBTCtools.ProBillTool(title)
    let detailBill = LBTCtools.ProBillTool(detail)
    let urlBill = LBTCtools.ProBillTool(url)

    let tiemstamp = (Date.now().toString().slice(0,-3))
    endtime = parseInt(tiemstamp) + 3600 * 24 * parseInt(endtime)
    let endtimeBill = LBTCtools.ProBillTool(endtime.toString())

    let optionsCount = options.length;
    optionsCount = optionsCount.toString(16)
    if (optionsCount.length === 1) {
        optionsCount = '0' + optionsCount;
    }

    let tempOptions = ''
    for (let o of options){
        let oStr = LBTCtools.ProBillTool(o)
        tempOptions += oStr
    }

    let fRes = prefix + op_code + titleBill + detailBill + urlBill + endtimeBill + optionsCount + tempOptions
    return fRes
}


LBTCtools.VoteToBill = function (billId,option) {
    let prefix = "00000000";
    let op_code = 'c7';
    let billIdLen = '28'

    billId = LBTCtools.StringtoHex(billId)
    option = '0' + option

    let fRes = prefix + op_code + billIdLen + billId + option
    return fRes
}


export default {
  LBTCtools,
  bs58,
  bs58check
}