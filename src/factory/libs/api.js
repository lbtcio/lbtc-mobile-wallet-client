/**
 * Api 
 */

let api = {
    title: '',
    baseURL: 'http://47.75.150.5:8080/',
    api: {
        getBalanceByAdd: 'mgetbalance',
        getTxByAddr: "mgettxbyaddr",
        listUnspent: 'mlistunspent',
        getListDelegates: 'mgetlistdelegates',
        getVoteByAddr: 'mgetvotebyaddress',
        getVotersByAddr: 'mgetvotersbywitness',
        gettxinfo: 'mgettxinfo',

        getHeight:'mgetblockcount',
        getversion: 'mgetversion',
        getNewsList: 'mgetnews',

        msendrawtransaction: 'msendrawtransaction'
    }
}


export default api;