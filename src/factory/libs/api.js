/**
 * Api 
 */

import wConfig from "../wallet/config";

const baseURLObj = {
  'bitcoin': 'http://47.75.150.5:8080/',
  'testnet': 'http://47.75.150.5:8822/'
}

let api = {
  title: '',
  baseURL: baseURLObj[wConfig.network],
  api: {
    getversion: 'mgetversion',
    getHeight: 'mgetblockcount',
    getTxByAddr: "mgettxbyaddr",
    gettxinfo: 'mgettxinfo',
    msendrawtransaction: 'msendrawtransaction',
    getUsername: 'mgetaddressname',
    getAddress: 'mgetnameaddress',
    // Nodes
    getListDelegates: 'mgetlistdelegates',
    getVoteByAddr: 'mgetvotebyaddress',
    getVotersByAddr: 'mgetvotersbywitness',
    // News
    getNewsList: 'mgetnews',
    getNewsList2: 'mgetnews2',
    // Token
    gettokeninfo: 'gettokeninfo',
    gettokeninfobyaddr: 'gettokeninfobyaddr',

    // getBalanceByAdd: 'mgetbalance',
    // listUnspent: 'mlistunspent'
  }
}


export default api;