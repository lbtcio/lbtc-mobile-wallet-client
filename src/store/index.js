import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        home: {
            save_wallet_list: {},
            save_current_wallet: '',
            save_wallet_info: {},
            save_txsDetails: {},
            save_UnSpent: {},
            save_moreStatus: false,
            save_nodata: false
        },
        count: 0,
        isFreshInHome: false,
        isplusReady: false,
        mainAction: 0,
        txInfo: {},
        currentHisAddress: '',
        news: {
            list: [],
            x: 0,
            y: 0,
            num: 10
        },
        txHis:{
            x: 0,
            y: 0,
        },
        vote: {
            forgeList: [],
            votesList: []
        }
    },

    mutations: {
        saveMainAction(state, data) {
            state.mainAction = data.mainAction
        },
        isFreshInHome(state, data) {
            state.isFreshInHome = data.isFreshInHome
        },
        saveHomeState(state, data) {
            state.home.save_wallet_list = data.save_wallet_list;
            state.home.save_current_wallet = data.save_current_wallet;
            state.home.save_wallet_info = data.save_wallet_info;
            state.home.save_txsDetails = data.save_txsDetails;
            state.home.save_UnSpent = data.save_UnSpent;
            state.home.save_moreStatus = data.save_moreStatus;
            state.home.save_nodata = data.save_nodata;
        },
        setUser(state, data) {
            state.name = data;
        },
        saveNewsXY(state, data) {
            state.news.x = data.left;
            state.news.y = data.top;
            state.news.num = data.num;
        },
        saveNewsList(state, data) {
            state.news.list = data.list;
        },
        saveTxHisXY(state, data) {
            state.txHis.x = data.left;
            state.txHis.y = data.top;
            state.txHis.page = data.page;
        },
        saveVoteData(state, data) {
            state.vote.forgeList = data.forgeList;
            state.vote.votesList = data.votesList;
        }
    }
});

export default store;