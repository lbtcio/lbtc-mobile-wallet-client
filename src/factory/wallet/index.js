import Vue from 'vue';
import wallet_service from './wallet-service';
import lbtc_tools from "./lbtc-tools";

Vue.prototype.Wallet = wallet_service.Wallet;
Vue.prototype.bip38 = wallet_service.bip38;
Vue.prototype.bip39 = wallet_service.bip39;
Vue.prototype.bitcoin = wallet_service.bitcoin;

Vue.prototype.LBTCtools = lbtc_tools.LBTCtools;
Vue.prototype.bs58check = lbtc_tools.bs58check;
Vue.prototype.bs58 = lbtc_tools.bs58;

