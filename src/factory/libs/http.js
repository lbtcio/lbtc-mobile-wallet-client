import axios from 'axios';
import qs from 'qs';
import api from './api'
import key from './key'
import md5 from "crypto-js/md5";

axios.defaults.retry = 0;   // Retry times
axios.defaults.retryDelay = 50000;
axios.defaults.baseURL = api.baseURL;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    var timestamp = Date.parse(new Date()) * 0.001;
    config.params['token'] = md5(key + '-' + config.params.addr + '-' + timestamp).toString();
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    if (!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
        return axios(config);
    });
});


export default {
    get(url, params, callback) {
        return axios.get(url, {
            params: params
        }).then(res => {
            if (res.status === 200 && callback) {
                callback(res.data);
            } else if (res.status === 200) return Promise.resolve(res.data);
            else return Promise;
        })
    },

    post(url, params, callback) {
        params.options = params.options || {};
        var config = {
            method: 'post',
            url: url,
            data: qs.stringify(params.data)
        };

        Object.keys(params.options).map(key => {
            config[key] = params.options[key];
        });

        return axios(config).then(res => {
            if (res.status === 200 && callback) {
                callback(res.data);
            } else if (res.status === 200) return Promise.resolve(res.data);
            else return Promise
        });
    }
}
