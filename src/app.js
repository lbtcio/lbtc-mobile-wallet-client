import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// VueI18n
import VueI18n from 'vue-i18n';
import zh from './factory/lang/zh';
import en from './factory/lang/en';

// UI
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

// Plugin
import lib from './factory/libs';
import wallet from './factory/wallet'

import localforage from 'localforage';
import moment from "moment"
import { Lazyload } from 'vant';
import VueClipboard from 'vue-clipboard2';
import VueScroller from 'vue-scroller';


import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css';

import '../static/theme/common.css';

// import VConsole from 'vconsole/dist/vconsole.min.js'
// let vConsole = new VConsole()

Vue.use(VueI18n);
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(VueClipboard);
Vue.use(VueScroller)
Vue.config.productionTip = false;

Vue.prototype.localforage = localforage;

let locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh';

const i18n = new VueI18n({
    locale: locale,
    messages: {
        'zh': zh,
        'en': en
    },
});

const app = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    lib,
    wallet,
    render: h => h(App)
});


Vue.mixin({
    computed: {
        plusReady() {
            return store.state.isplusReady;
        }
    }
})


document.addEventListener('plusready', function () {
    store.state.isplusReady = true;

    let now = false;
    let time = null;
    plus.key.addEventListener('backbutton', function () {
        
        if (app.$route.path == '/' || app.$route.path == '/main-index' || app.$route.path == '/create-index') {
            time = null;
            if (now) {
                now = false;
                plus.runtime.quit();
            } else {
                now = true;
                plus.nativeUI.toast("再按一次退出", { duration: 'short' });
                time = setTimeout(() => {
                    now = false;
                }, 1000);
            }
        } else {
            router.back();
        }

    })
})


Vue.filter('formatHash', function (value) {
    let subStr1 = value.slice(0,6);
    let subStr2 = value.slice(-6);
    let subStr = subStr1 + "..." + subStr2 ;
    return subStr;
})

Vue.filter('formatTime', function (value, type) {
    if (String(value).length == 10) {
        switch (type) {
            case 1: 
                return moment(value*1000).format("YYYY/MM/DD");
            case 2: 
                return moment(value*1000).format("YYYY/MM/DD HH:mm:ss");
        }
    } else if (String(value).length == 13) {
        switch (type) {
            case 1: 
                return moment(value).format("YYYY/MM/DD");
            case 2: 
                return moment(value).format("YYYY/MM/DD HH:mm:ss");
        }
    }
})

