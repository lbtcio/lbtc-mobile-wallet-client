import wallet_service from './wallet-service';

let Wallet = wallet_service.Wallet;

class WalletDB {
  constructor (current, addresses, accounts) {
    this.current = current,
    this.addresses = addresses,
    this.accounts = accounts
  }
  
  insertaccount(address, avatar, name, password, mnemonicWord, privateKey, network, backupFlag, source) {
    let wallet = {
      address : address,
      avatar: avatar,
      name : name,
      password : password,
      mnemonicWord: mnemonicWord,
      privateKey: privateKey,
      network: network,
      currentHeight: 0,
      history: [],
      availableTxs: [],
      availableBalance: 0,
      unavailableTxs: [],
      unavailableBalance: 0,
      confirmingTx: {},
      backupFlag: backupFlag,
      source: source,
      state: 'N'
    }
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i] == address) {
        this.addresses.splice(i, 1);
        break
      }
    }
    this.current = address;
    this.addresses[this.addresses.length] = address;
    this.accounts[address] = wallet;
  }

  deleteaccount(address) {
    if (this.accounts[address]) {
      delete this.accounts[address]
    }
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i] == address) {
        this.addresses.splice(i, 1);
        break
      }
    }
    if (this.current == address && this.addresses.length) {
      if (this.addresses.length) {
        this.current = this.addresses[0];
      } else {
        this.current = '';
      }
    }
  }

  insertHistroy(address, data) {
    let currentHeight = data.currentHeight;
    let currentHistory = data.currentHistory;
    this.accounts[address].currentHeight = currentHeight;
    if (currentHistory.length) {
      
      if (Object.keys(this.accounts[address].confirmingTx).length) {
        for (let i = 0; i < currentHistory.length; i++) {
          const item = currentHistory[i];
          if (item.hash == this.accounts[address].confirmingTx.hash) {
            this.accounts[address].confirmingTx = {};
            break
          }
        }
      }
      
      this.accounts[address].history = currentHistory.concat(this.accounts[address].history);
      let unSpent = Wallet.addListUnSpent(currentHistory, address, currentHeight, {
        availableTxs: this.accounts[address].availableTxs,
        availableBalance: this.accounts[address].availableBalance,
        unavailableTxs: this.accounts[address].unavailableTxs,
        unavailableBalance: this.accounts[address].unavailableBalance
      });
  
      this.accounts[address].availableTxs = unSpent.availableTxs;
      this.accounts[address].availableBalance = unSpent.availableBalance;
      this.accounts[address].unavailableTxs = unSpent.unavailableTxs;
      this.accounts[address].unavailableBalance = unSpent.unavailableBalance
    }
  }

  selectWallet(address) {
    this.current = address
  }

  changePassword(address, password) {
    this.accounts[address].password = password;
  }

  changeName(address, name) {
    this.accounts[address].name = name;
  }

  insertConfirmingTx(address, tx) {
    this.accounts[address].confirmingTx = tx;
  }
  
}


export default WalletDB