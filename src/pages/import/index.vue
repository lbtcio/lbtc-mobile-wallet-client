<style lang="scss" scoped>
#import-index {
  & > .container {
    height: 100vh;
  }
  .van-popup--right {
    width: 100%;
    height: 100%;
  }
  .term-content {
    p {
      font-size: 12px;
      letter-spacing: .5px;
    }
  }
}
</style>
<template>
  <div id="import-index">
    <van-nav-bar
      :title="$t('import.navTitle')"
      left-arrow 
      fixed 
      @click-left="onClickLeft"
    />

    <div class="container fixed-container">

      <van-tabs v-model="tabsIndex" @click="tabsOnClick" swipeable :line-width='lineWidth'>
        <van-tab :title="$t('import.tabTitle1')">
          <div slot="title">
            {{$t('import.tabTitle1')}}
          </div>
          <div>
            <div class="input-group">
              <div class="input-otem">
                <textarea rows="3" cols="20" :placeholder="$t('import.mnemTextarea')" v-model.trim="mnem.mnem.value"></textarea>
                <label for="mnem" class="error-msg" v-if="mnem.mnem.msg">{{mnem.mnem.msg}}</label>
              </div>
              <div class="input-item">
                <input type="text" :placeholder="$t('create.create.walletName')" v-model.trim="mnem.name.value" @change="nameChange(mnem.name, 'mnem')">
                <label for="name" class="error-msg" v-if="mnem.name.msg">{{mnem.name.msg}}</label>
              </div>
              <div class="input-item">
                <input type="password" :placeholder="$t('create.create.walletPassword')" v-model.trim="mnem.password.value" @change="passChange(mnem.password, 'mnem')">
                <label for="password" class="error-msg" v-if="mnem.password.msg">{{mnem.password.msg}}</label>
              </div>
              <div class="input-item">
                <input type="password" :placeholder="$t('create.create.reWalletPassword')" v-model.trim="mnem.repass.value" @change="repassChange(mnem.repass, 'mnem')">
                <label for="repass" class="error-msg" v-if="mnem.repass.msg">{{mnem.repass.msg}}</label>
              </div>
              <div class="input-item">
                <van-checkbox v-model="mnem.checked.value" @change="checkboxChange(mnem.checked, 'mnem')">{{$t('create.create.checkbox1')}}<a href="javascript:;" @click.stop="openTerms = true"> {{$t('create.create.checkbox2')}}</a></van-checkbox>
                <label for="checked" class="error-msg" v-if="mnem.checked.msg">{{mnem.checked.msg}}</label>
              </div>
            </div>
            <div class="input-group">
              <button class="default" @click="importMnem">{{$t('import.importMnem')}}</button>
              <p class="f99">
                {{$t('create.create.msg')}}
              </p>
            </div>
          </div>
        </van-tab>

        <van-tab :title="$t('import.tabTitle2')">
          <div slot="title">
            {{$t('import.tabTitle2')}}
          </div>
          <div>
            <div class="input-group">
              <div class="">
                <textarea cols="3" :placeholder="$t('import.prvTextarea')" v-model.trim="prv.prv.value"></textarea>
                <label for="prv" class="error-msg" v-if="prv.prv.msg">{{prv.prv.msg}}</label>
              </div>
              <div class="input-item">
                <input type="text" :placeholder="$t('create.create.walletName')" v-model.trim="prv.name.value" @change="nameChange(prv.name, 'prv')">
                <label for="name" class="error-msg" v-if="prv.name.msg">{{prv.name.msg}}</label>
              </div>
              <div class="input-item">
                <input type="password" :placeholder="$t('create.create.walletPassword')" v-model.trim="prv.password.value" @change="passChange(prv.password, 'prv')">
                <label for="password" class="error-msg" v-if="prv.password.msg">{{prv.password.msg}}</label>
              </div>
              <div class="input-item">
                <input type="password" :placeholder="$t('create.create.reWalletPassword')" v-model.trim="prv.repass.value" @change="repassChange(prv.repass, 'prv')">
                <label for="repass" class="error-msg" v-if="prv.repass.msg">{{prv.repass.msg}}</label>
              </div>
              <div class="input-item">
                <van-checkbox v-model="prv.checked.value" @change="checkboxChange(prv.checked, 'prv')">{{$t('create.create.checkbox1')}}<a href="javascript:;" @click.stop="openTerms = true"> {{$t('create.create.checkbox2')}}</a></van-checkbox>
                <label for="checked" class="error-msg" v-if="prv.checked.msg">{{prv.checked.msg}}</label>
              </div>
              
            </div>
            <div class="input-group">
              <button class="default" @click="importPrv">{{$t('import.importPrv')}}</button>
              <p class="f99">
                {{$t('create.create.msg')}}
              </p>
            </div>
          </div>
        </van-tab>

      </van-tabs>

    </div>

    <van-popup v-model="openTerms" position="right">
      <van-nav-bar
        :title="$t('create.create.termTitle')"
        left-arrow
        fixed 
        @click-left="openTerms = false"
      />
      <div class="container fixed-container term-content" v-html="termContent">
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Toast } from "vant";
import wConfig from "../../factory/wallet/config.js"

export default {
  components: {},
  props: {},
  data() {
    return {
      termContent: '',
      wallet_list: {},

      deFalse: false,
      openSuccessDialog: false,
      openFailDialog: false,
      openTerms: false,
      clickStatus: true,
      tabsIndex: 0,
      lineWidth: 100,
      checked1: false,
      checked2: false,
      network: {},
      mnem: {
        mnem: {
          value: "",
          msg: "",
          status: false
        },
        name: {
          value: "",
          msg: "",
          status: false
        },
        password: {
          value: "",
          msg: "",
          status: false
        },
        repass: {
          value: "",
          msg: "",
          status: false
        },
        checked: {
          value: false,
          msg: "",
          status: false
        }
      },
      prv: {
        prv: {
          value: "",
          msg: "",
          status: false
        },
        name: {
          value: "",
          msg: "",
          status: false
        },
        password: {
          value: "",
          msg: "",
          status: false
        },
        repass: {
          value: "",
          msg: "",
          status: false
        },
        checked: {
          value: false,
          msg: "",
          status: false
        }
      }
    };
  },
  computed: {},
  created() {
    this.inportInit();
  },
  mounted() {},
  methods: {
    inportInit() {
      this.termContent = wConfig.terms;
      this.localforage.getItem("wallet_list").then(res => {
        if (res) {
          this.wallet_list = res;
        } else {
          this.wallet_list = {};
        }
      });
    },

    onClickLeft() {
      this.$router.back();
    },

    tabsOnClick(index, title) {},

    nameChange(e, type) {
      if (e.value == "") {
        this[type].name.msg = this.$t('create.create.walletNameMsg');
        this[type].name.status = false;
      } else {
        this[type].name.msg = "";
        this[type].name.status = true;
      }
    },

    passChange(e, type) {
      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/);
      if (e.value == "") {
        this[type].password.msg = this.$t('create.create.walletPasswordMsg1');
        this[type].password.status = false;
      } else if (reg.test(e.value)) {
        this[type].password.msg = "";
        this[type].password.status = true;
      } else {
        this[type].password.msg = this.$t('create.create.walletPasswordMsg2');
        this[type].password.status = false;
      }
      this.repassChange(this[type].repass, type);
    },

    repassChange(e, type) {
      if (this[type].password.value == this[type].repass.value) {
        this[type].repass.msg = "";
        this[type].repass.status = true;
      } else {
        this[type].repass.msg = this.$t('create.create.reWalletPasswordMsg');
        this[type].repass.status = false;
      }
    },

    checkboxChange(e, type) {
      if (!e.value) {
        this[type].checked.msg = this.$t('create.create.checkboxMsg');
        this[type].checked.status = false;
      } else {
        this[type].checked.msg = "";
        this[type].checked.status = true;
      }
    },

    checkWalletListLen() {
      let arr = Object.keys(this.wallet_list);

      if (arr.length > 4) {
        Toast.fail({
          duration: 1500,
          message: this.$t('create.create.sumMsg')
        });
        return false;
      } else {
        return true;
      }
    },

    // Import Mnem
    importMnem() {
      if (!this.checkWalletListLen) {
        return false;
      }
      this.nameChange(this.mnem.name, "mnem");
      this.passChange(this.mnem.password, "mnem");
      this.repassChange(this.mnem.repass, "mnem");
      this.checkboxChange(this.mnem.checked, "mnem");
      if (
        this.mnem.name.status &&
        this.mnem.password.status &&
        this.mnem.repass.status &&
        this.mnem.checked.status
      ) {
        if (!this.bip39.validateMnemonic(this.mnem.mnem.value)) {
          Toast({
            duration: 1500,
            message: this.$t('import.msg1')
          });
          return false;
        }
        Toast.loading({
          duration: 0,
          mask: true,
          message: this.$t('import.msg2')
        });
        window.setTimeout(() => {
          this.Wallet.createWalletFromMnemonic(this.mnem.mnem.value)
            .then(walletInfo => {
              walletInfo.name = this.mnem.name.value;
              walletInfo.psw = this.mnem.password.value;
              walletInfo.ispackup = true;

              this.wallet_info = walletInfo;
              this.wallet_list[walletInfo.addr] = walletInfo;

              Toast.loading({
                duration: 0,
                mask: true,
                message: this.$t('import.msg3')
              });

              this.getTxByAdd(walletInfo.addr);

            })
            .catch(err => {});
        }, 200);
      }
    },

    // Import Prv
    importPrv() {
      if (!this.checkWalletListLen) {
        return false;
      }
      this.nameChange(this.prv.name, "prv");
      this.passChange(this.prv.password, "prv");
      this.repassChange(this.prv.repass, "prv");
      this.checkboxChange(this.prv.checked, "prv");
      if (
        this.prv.name.status &&
        this.prv.password.status &&
        this.prv.repass.status &&
        this.prv.checked.status
      ) {
        Toast.loading({
          duration: 0,
          mask: true,
          message: this.$t('import.msg2')
        });
        window.setTimeout(() => {
          this.Wallet.createWalletFromPrv(this.prv.prv.value)
            .then(walletInfo => {
              walletInfo.name = this.prv.name.value;
              walletInfo.psw = this.prv.password.value;
              walletInfo.ispackup = true;

              this.wallet_info = walletInfo;
              this.wallet_list[walletInfo.addr] = walletInfo;

              Toast.loading({
                duration: 0,
                mask: true,
                message: this.$t('import.msg3')
              });

              this.getTxByAdd(walletInfo.addr);

            })
            .catch(err => {
              Toast.fail({
                duration: 1500,
                message: this.$t('import.msg4')
              });
              return false;
            });
        }, 200);
      }
    },

    getTxByAdd(addr) {
      this.$http
        .get(this.$api.api.getHeight, { addr: addr })
        .then(res => {
          if (res.error) {
            return Promise.reject(res.msg);
          } else {
            return Promise.resolve(res.msg);
          }
        })
        .then(height => {
          let total_height = height;
          let current_height = 1;

          let tx_list = [];
          this.$http.get(this.$api.api.getTxByAddr, {
            addr: addr,
            start: current_height,
            end: total_height
          })
          .then(result => {
            if (result.error) {
              window.setTimeout(() => {
                Toast.fail({
                  duration: 1500,
                  message: result.msg
                });
                return false;
              }, 1000);
            } else {
              tx_list = result.msg;
            }
            this.getTxsDetails(tx_list, total_height, addr);
          });
        })
        .catch(err => {
          Toast({
            duration: 1500,
            message: err
          })
        });
    },

    getTxsDetails(tx_list, total_height, current_wallet) {
      let txsDetails = {};
      let proList = [];
      let txsList = [];
      let UnSpent = {};

      if (tx_list.length) {

        let txGroup = this.chunkArry(tx_list, 100);

        this.Wallet.queue(txGroup, current_wallet).then( txsList => {
          return Promise.resolve(txsList)
        }).then( txsList => {
          UnSpent = this.Wallet.listUnSpent(txsList, current_wallet, total_height);

          txsDetails.current_height = total_height;
          txsDetails.txsList = txsList;

          let moreStatus = false;
          if (txsList.length > 10) {
            moreStatus = true;
          }

          this.$store.commit('saveHomeState', {
            save_wallet_list: this.wallet_list,
            save_current_wallet: this.wallet_info.addr,
            save_wallet_info: this.wallet_info,
            save_txsDetails: txsDetails,
            save_UnSpent: UnSpent,
            save_moreStatus: moreStatus,
            save_nodata: false
          });

          return Promise.resolve(
            Promise.all([
              this.localforage.setItem(current_wallet + "+unspent", UnSpent),
              this.localforage.setItem(current_wallet + "+txsDetails", txsDetails),
              this.localforage.setItem("wallet_list", this.wallet_list),
              this.localforage.setItem("current_mnem", this.wallet_info.mnemonic),
              this.localforage.setItem("current_wallet", this.wallet_info.addr)
            ]).then( res => {
              return Promise.resolve(res)
            })
          )
        }).then(res => {
          Toast.clear();
          this.$router.push({ path: "/main-index" });
          return true;
        })

      } else {
        txsDetails.current_height = 0;
        txsDetails.txsList = [];
        UnSpent.available = [];
        UnSpent.unavailable = [];
        UnSpent.availablebalance = 0;
        UnSpent.unavailablebalance = 0;
        UnSpent.totalbalance = 0;

        this.$store.commit('saveHomeState', {
          save_wallet_list: this.wallet_list,
          save_current_wallet: this.wallet_info.addr,
          save_wallet_info: this.wallet_info,
          save_txsDetails: txsDetails,
          save_UnSpent: UnSpent,
          save_moreStatus: false,
          save_nodata: true
        });

        Promise.all([
          this.localforage.setItem(current_wallet + "+unspent", UnSpent),
          this.localforage.setItem(current_wallet + "+txsDetails", txsDetails),
          this.localforage.setItem("wallet_list", this.wallet_list),
          this.localforage.setItem("current_mnem", this.wallet_info.mnemonic),
          this.localforage.setItem("current_wallet", this.wallet_info.addr)
        ]).then( res => {
          Toast.clear();
          this.$router.push({ path: "/main-index" });
          return true;
        })

      }
    }

  },
  destroyed() {},
  watch: {}
};
</script>