<style lang="scss" scoped>
#mine-manageInfo{
  height: 100vh;
  position: relative;
  .manage-header {
    text-align: center;
    padding: 20px 0;
  }
  .info-photo {
    height: 60px;
  }
  .info-balance {
    font-size: 20px;
    font-weight: 600;
    color: #1d5aa3;
    height: 36px;
    line-height: 36px;
    position: relative;
    .more-balance-content {
      padding: 2px 5px;
      width: 50%;
      position: absolute;
      font-size: 10px;
      text-align: left;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      overflow: visible;
      background-color: #eee;
      line-height: 1.5em;
    }
  }
  .more {
    font-size: 10px;
    .van-icon-arrow::before {
      transition: 0.3s;
    }
  }
  .show-more-balance {
    .van-icon-arrow::before {
      transform: rotate(90deg);
    }
  }
  .info-addr {
    padding: 5px 40px;
    color: #666;
    word-break: break-all;
    font-size: 14px;
  }
  .input-with-label-item {
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
    input {
      border: none;
    }
    &::after {
      content: '';
      position: absolute;
      left: 15px;
      right: 0;
      bottom: 0;
      width: auto;
      transform: scale(1, 0.5);
      transform-origin: 0 0;
      pointer-events: none;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .van-hairline--top-bottom::after {
    border-width: 0 0;
  }
  .bottom-botton {
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
  }
  .van-popup--right .content {
    width: 100vw;
    height: 100vh;
  }
  .show-mnemonic {
    background-color: rgba(29, 90, 163, 0.11);
    padding: 20px 15px;
    letter-spacing: 0;
    margin: 10px 0;
    word-break: break-all;
  }
  .dialog-title {
    position: relative;
  }
  .dialog-cloes {
    position: absolute;
    right: 15px;
    top: 2px;
    height: 80%;
  }
  .mt62 {
    margin-top: 62px;;
  }
}
</style>
<template>
  <div id="mine-manageInfo" @click="showMoreBalance = false">

    <van-nav-bar
      :title="info.name"
      left-text=""
      fixed 
      :right-text="$t('mine.manageInfo.navRight')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div class="container fixed-container">

      <div class="manage-header">
        <img class="info-photo" :src="'http://lbtc.io/wallet/static/img/photo/1/' + info.photo + '.png'">
        <div class="info-balance" :class="showMoreBalance ? 'show-more-balance' : ''">
          <span @click.stop="moreBalance">
           {{UnSpent ? UnSpent.totalbalance : 0}} LBTC
          </span>
          <span @click.stop="moreBalance" class="more" v-if="UnSpent.unavailablebalance">
            <van-icon name="arrow" />
          </span>
          <div class="more-balance-content" v-if="showMoreBalance">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>{{$t('mine.manageInfo.availablebalance')}}:</td>
                <td><span>{{UnSpent.availablebalance}} </span><span class="sign">LBTC</span></td>
              </tr>
              <tr>
                <td>{{$t('mine.manageInfo.unavailablebalance')}}:</td>
                <td><span>{{UnSpent.unavailablebalance}} </span><span class="sign">LBTC</span></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="info-addr">
          {{addr}}
        </div>
      </div>
      
      <div class="info-content">
        <div class="input-with-label-item" style="margin-bottom: 0px;margin-top: 24px;">
          <label for="name">
            {{$t('mine.manageInfo.walletName')}}
          </label>
          <input type="text" id="name" v-model="wallet_name" @focus="isShowbutton(1)" @blur="isShowbutton(2)"/>
        </div>
        <van-cell-group>
          <van-cell :title="$t('mine.manageInfo.changePass')" is-link @click="openChangePsw = true"/>
          <van-cell :title="$t('mine.manageInfo.exportPrv')" is-link @click="itemClick('prv')"/>
        </van-cell-group>
      </div>
      
    </div>

    <div class="bottom-botton input-group" v-if="showButton">
      <button class="default" v-if="info.mnemonic" @click="itemClick('mnemonic')">{{$t('mine.manageInfo.packupMnem')}}</button>
      <button class="warn" :class="info.mnemonic? '' : 'mt62'" @click="itemClick('delete')">{{$t('mine.manageInfo.deleWallet')}}</button>
    </div>

    <van-dialog
      v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('commom.passDialog.confirmButtonText')" 
      :cancelButtonText="$t('commom.passDialog.cancelButtonText')" 
      :before-close="beforePassDialogClose"
    >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.passDialog.dialogTitle')}}</div class>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw"  @focus="isShowbutton(1)" @blur="isShowbutton(2)">
      </div>
    </van-dialog>

    <van-dialog
      v-model="openExportDialog"
      confirm-button-text="" 
      :show-confirm-button="false" 
      >
      <div class="dialog-title" style="margin-top: 20px;">
        {{$t('mine.manageInfo.exportPrv')}}
        <img class="dialog-cloes" src="http://lbtc.io/wallet/static/img/close.png" @click="closeExportDialog">
      </div>
      <div class="dialog-content">
        <div class="show-mnemonic">
          {{content}}
        </div>
      </div>
      <div class="dialog-button default-color text-center" v-clipboard:copy="content" v-clipboard:success="onCopy" v-clipboard:error="onError">
        {{$t('mine.manageInfo.copy')}}
      </div>
    </van-dialog>

    <van-popup v-model="openChangePsw" position="right">
      <div class="content">
        <van-nav-bar
          :title="$t('mine.manageInfo.changePass')"
          fixed 
          left-arrow
          @click-left="cloesChangePsw"
        />
        <div class="container fixed-container">
          <div class="input-group">
            <div class="input-item">
              <input type="password" :placeholder="$t('mine.manageInfo.oldPass')" v-model.trim="oldPsw.value" @change="oldPswChange()">
              <label class="error-msg" v-if="oldPsw.msg">{{oldPsw.msg}}</label>
            </div>
            <div class="input-item">
              <input type="password" :placeholder="$t('mine.manageInfo.newPass')" v-model.trim="newPsw.value" @change="newPswChange()">
              <label class="error-msg" v-if="newPsw.msg">{{newPsw.msg}}</label>
            </div>
            <div class="input-item">
              <input type="password" :placeholder="$t('mine.manageInfo.reNewPass')" v-model="reNewPsw.value" @change="reNewPswChange()">
              <label class="error-msg" v-if="reNewPsw.msg">{{reNewPsw.msg}}</label>
            </div>
          </div>
          <div class="confirm-botton input-group">
            <button class="default" @click="confirmChangePsw()">{{$t('mine.manageInfo.confirmChange')}}</button>
          </div>
        </div>
      </div> 
    </van-popup>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      isLoading: false,
      showButton: true,
      addr: '',
      current_wallet: '',
      wallet_list: {},
      info: {},
      UnSpent: {},
      showMoreBalance: false,
      wallet_name: '',
      openPassDialog: false,
      psw: '',
      
      openExportDialog: false,
      type: '',
      content: '',
      
      openChangePsw: false,
      oldPsw: {
        value: '',
        msg: '',
        status: false
      },
      newPsw: {
        value: '',
        msg: '',
        status: false
      },
      reNewPsw: {
        value: '',
        msg: '',
        status: false
      },
    }
  },
  computed:{},
  created(){
    this.manageInfoInit();
  },
  mounted(){},
  methods:{
    manageInfoInit() {
      this.addr = this.$route.query.addr;
      this.localforage.getItem('current_wallet').then( current_wallet => {
        if (current_wallet) {
          this.current_wallet = current_wallet;
        }
      })
      this.localforage.getItem('wallet_list').then( list => {
        if (list) {
          this.wallet_list = list;
          this.info = list[this.addr];
          this.wallet_name = this.info.name;
        }
      })
      this.localforage.getItem(this.addr + "+unspent").then( res => {
        if (res) {
          this.UnSpent = res
        }
      })
    },

    onClickLeft() {
      this.$router.back();
    },
    
    onClickRight() {
      if (this.wallet_name == this.info.name) {
        return false
      } else {
        this.info.name = this.wallet_name;
        this.wallet_list[this.addr] = this.info;
        this.localforage.setItem('wallet_list', this.wallet_list).then( res => {
          if (res) {
            this.manageInfoInit();
            Toast.success({
              duration: 1500,
              message: this.$t('mine.manageInfo.msg1')
            });
          }
        });
      }
    },

    itemClick(type) {
      this.openPassDialog = true;
      this.type = type;
    },

    beforePassDialogClose(action, done) {
      if (action == "confirm") {
        if (this.psw == this.info.psw) {
          if (this.type == 'prv') {
            this.content = this.info.prv;       
            done();
            this.openExportDialog = true;
          } else if (this.type == 'mnemonic'){
            done();
            this.$router.push({ path: "/create-mnemonic", query: { wallet_info: JSON.stringify(this.info), from: 'manageInfo'}});
          } else if (this.type == 'delete') {
            if (this.info.addr) {
              delete this.wallet_list[this.addr]
              this.localforage.setItem('wallet_list', this.wallet_list).then( res => {
                if (this.addr == this.current_wallet) {
                  if (Object.keys(this.wallet_list).length > 0) {
                    for (const key in this.wallet_list) {
                      if (key) {
                        this.localforage.setItem('current_wallet', key).then( res => {
                          if (res) {
                            Toast.success({
                              duration: 1500,
                              message: this.$t('mine.manageInfo.msg2')
                            });
                            done();
                            this.$router.push({ path: '/mine-manage'});
                            return false
                          }
                        })
                      }
                    }
                  } else {
                    this.localforage.removeItem('current_wallet').then( res => {
                      Toast.success({
                        duration: 1500,
                        message: this.$t('mine.manageInfo.msg2')
                      });
                      this.$router.push({ path: "/create-index" });
                      return false
                    });
                  }
                } else {
                  Toast.success({
                    duration: 1500,
                    message: this.$t('mine.manageInfo.msg2')
                  });
                  this.$router.push({ path: '/mine-manage'})
                  return false
                }
              })
            }
          }
          this.psw = '';
        } else {
          Toast.fail({
            duration: 1000,
            message: this.$t('mine.manageInfo.msg3')
          });
          this.psw = '';
          done(false);
        }
      } else {
        this.psw = '';
        done();
      }
    },

    closeExportDialog() {
      this.openExportDialog = false;
      this.content = '';
    },

    onCopy() {
      Toast.success({
        duration: 1500,
        message: this.$t('mine.manageInfo.msg4')
      });
    },

    onError() {
      Toast.fail({
        duration: 1500,
        message: this.$t('mine.manageInfo.msg5')
      });
    },
    
    cloesChangePsw() {
      this.openChangePsw = false;
      this.oldPsw = {
          value: '',
          msg: '',
          status: false
        };
      this.newPsw = {
          value: '',
          msg: '',
          status: false
        };
      this.reNewPsw = {
          value: '',
          msg: '',
          status: false
        };
    },

    oldPswChange() {
      if (this.oldPsw.value == '') {
        this.oldPsw.msg = this.$t('mine.manageInfo.msg6');
        this.oldPsw.status = false;
      } else {
        this.oldPsw.msg = '';
        this.oldPsw.status = true;
      }
    },

    newPswChange() {
      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/);
      if (this.newPsw.value == '') {
        this.newPsw.msg = this.$t('create.create.walletPasswordMsg1');
        this.newPsw.status = false;
      } else if (reg.test(this.newPsw.value)) {
        this.newPsw.msg = '';
        this.newPsw.status = true;
      } else {
        this.newPsw.msg = this.$t('create.create.walletPasswordMsg2');
        this.newPsw.status = false;
      }
      this.reNewPswChange();
    },

    reNewPswChange() {
      if (this.newPsw.value == this.reNewPsw.value ) {
        this.reNewPsw.msg = '';
        this.reNewPsw.status = true;
      } else {
        this.reNewPsw.msg = this.$t('create.create.reWalletPasswordMsg');
        this.reNewPsw.status = false;
      }
    },

    confirmChangePsw() {
      this.oldPswChange();
      this.newPswChange();
      this.reNewPswChange();
      if (!this.oldPsw.status || !this.newPsw.status ||!this.reNewPsw.status) {
        return false
      }
      if (this.oldPsw.value != this.info.psw) {
        Toast.fail({
          duration: 1500,
          message: this.$t('mine.manageInfo.msg9')
        });
        return false
      }
      if (this.newPsw.value == this.info.psw) {
        Toast.fail({
          duration: 1500,
          message: this.$t('mine.manageInfo.msg10')
        });
        return false
      }
      this.info.psw = this.newPsw.value;
      this.wallet_list[this.addr] = this.info;
      this.localforage.setItem('wallet_list', this.wallet_list).then( res => {
        if (res) {
          this.manageInfoInit();
          Toast.success({
            duration: 1500,
            message: this.$t('mine.manageInfo.msg11')
          });
          setTimeout(() => {
            this.cloesChangePsw();
          }, 500)
        }
      });
    },

    isShowbutton(e) {
      if (e ==1) {
        this.showButton = false;
      } else {
        setTimeout(() => {
          this.showButton = true;
        }, 200)
      }
    },

    moreBalance() {
      if (this.UnSpent.unavailablebalance) {
        this.showMoreBalance = !this.showMoreBalance;
      } else {
        return false
      }
    }
  },
  destroyed(){},
  watch:{},
}
</script>