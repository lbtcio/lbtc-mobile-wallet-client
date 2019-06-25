import Vue from 'vue';
import http from './http';
import api from "./api.js";
import localforage from 'localforage';
import calc from 'calculatorjs';
import bign from 'big-number';
import decimal from 'decimal.js';
import moment from "moment";
import store from "store";
import wConfig from "../wallet/config";


Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.localforage = localforage;
Vue.prototype.calc = calc;
Vue.prototype.bign = bign;
Vue.prototype.decimal = decimal;
Vue.prototype.localStore = store;


Vue.prototype.returnToSuperior = function () {
    window.history.back();
};

Vue.prototype.isEmptyObject = function (e) {
    for (let i in e) return false;
    return true;
};

Vue.prototype.isEmptyString = function (e) {
    let len = e.toString().trim().length;
    if (len == 0) {
        return false;
    } else {
        return true;
    }
}

Vue.prototype.isAddress = function (e) {
    let a = {
        'bitcoin': /^1{1}[A-Za-z0-9]{25,33}$/,
        'testnet': /^(m|n){1}[A-Za-z0-9]{25,33}$/
    }
    let re = a[wConfig.network];
    if (re.test(e)) {
        return true
    } else {
        return false
    }
}

Vue.prototype.isPc = function () {
    let userAgentInfo = window.navigator.userAgent;
    const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
    ];
    let flag = true;
    for (let v = 0, len = Agents.length; v < len; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

Vue.prototype.isArray = function (e) {
    return e instanceof Array
}

Vue.prototype.Xreplace = function Xreplace(str, length, reversed) {
    let re = new RegExp("\\w{1," + length + "}", "g");
    let ma = str.match(re);
    if (reversed) ma.reverse();
    for (let i = 0; i < ma.length; i++) {
        ma[i] = parseInt('0x' + ma[i]);
    }
    return ma;
}

Vue.prototype.stringToHex = function (str) {
    let val = "";
    for (let i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return val;
}

Vue.prototype.hexToString = function (hex) {
    let val = "";
    let arr = hex.split(",");
    for (let i = 0; i < arr.length; i++) {　　
        val += String.fromCharCode(parseInt(arr[i], 16));
    }
    return val;
}

Vue.prototype.randArr = function (a) {
    let len = a.length;
    for (let i = 0; i < len; i++) {
        let end = len - 1;
        let index = (Math.random() * (end + 1)) >> 0;
        let t = a[end];
        a[end] = a[index];
        a[index] = t;
    }
    return a;
};

Vue.prototype.chunkArry = function (array, size) {
    const length = array.length
    if (!length || !size || size < 1) {
      return []
    }
    let index = 0 
    let resIndex = 0 
  
    let result = new Array(Math.ceil(length / size))
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size))
    }
    return result
}

Vue.prototype.versionCompare = function(a, b) {
    let _a = toNum(a), _b = toNum(b);   
    if(_a == _b) {
        return false;
    } else if(_a > _b) {
        return true;
    } else {
        return false;
    }
}

Vue.filter('formatHash', function (value) {
    let subStr1 = value.slice(0,8);
    let subStr2 = value.slice(-8);
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

function toNum (a) {
    a = a.toString();
    let c = a.split(/\./);// or： let c = a.split('.');
    let num_place = ["","0","00","000","0000"], r = num_place.reverse();
    for (let i = 0; i< c.length; i++){ 
        let len = c[i].length;       
        c[i] = r[len] + c[i];  
    } 
    let res = c.join(''); 
    return res; 
}

