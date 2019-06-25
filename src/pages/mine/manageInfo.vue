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
      color: #999;
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
  .dialog-content-box {
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
  <div id="mine-manageInfo" @click="showMoreBalance = false" v-if="walletDB.accounts[addr]">

    <van-nav-bar :z-index="1000" 
      :title="walletDB.accounts[addr].name"
      left-text=""
      fixed 
      :right-text="$t('mine.manageInfo.navRight')"
      left-arrow
      @click-left="$router.goBack()"
      @click-right="onClickRight"
    />

    <div class="container fixed-container">

      <div class="manage-header">
        <img class="info-photo" :src="'https://lbtc.io/wallet/static/img/photo/1/' + walletDB.accounts[addr].avatar + '.png'">
        <div class="info-balance" :class="showMoreBalance ? 'show-more-balance' : ''">
          <span @click.stop="moreBalance">
           {{decimal(walletDB.accounts[addr].availableBalance).plus(walletDB.accounts[addr].unavailableBalance).toNumber()}} LBTC
          </span>
          <span @click.stop="moreBalance" class="more" v-if="walletDB.accounts[addr].unavailableBalance">
            <van-icon name="arrow" />
          </span>
          <div class="more-balance-content" v-if="showMoreBalance">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>{{$t('mine.manageInfo.availablebalance')}}:</td>
                <td><span>{{walletDB.accounts[addr].availableBalance}} </span><span class="sign">LBTC</span></td>
              </tr>
              <tr>
                <td>{{$t('mine.manageInfo.unavailablebalance')}}:</td>
                <td><span>{{walletDB.accounts[addr].unavailableBalance}} </span><span class="sign">LBTC</span></td>
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
          <van-cell :title="$t('mine.manageInfo.resync')" @click="resyncData(addr)"/>
        </van-cell-group>
      </div>
      
    </div>

    <div class="bottom-botton input-group" v-if="showButton">
      <button class="default" v-if="walletDB.accounts[addr].mnemonicWord" @click="itemClick('mnemonic')">{{$t('mine.manageInfo.packupMnem')}}</button>
      <button class="warn" :class="walletDB.accounts[addr].mnemonicWord ? '' : 'mt62'" @click="itemClick('delete')">{{$t('mine.manageInfo.deleWallet')}}</button>
    </div>

    <van-dialog
      v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('commom.passDialog.confirmButtonText')" 
      :cancelButtonText="$t('commom.passDialog.cancelButtonText')" 
      :before-close="beforePassDialogClose">
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.passDialog.dialogTitle')}}</div class>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw" @focus="isShowbutton(1)" @blur="isShowbutton(2)">
      </div>
    </van-dialog>

    <van-dialog
      v-model="openExportDialog"
      confirm-button-text="" 
      :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 20px;">
        {{$t('mine.manageInfo.exportPrv')}}
        <img class="dialog-cloes" src="https://lbtc.io/wallet/static/img/close.png" @click="closeExportDialog">
      </div>
      <div class="dialog-content">
        <div class="dialog-content-box">
          {{content}}
        </div>
      </div>
      <div class="dialog-button default-color text-center" v-clipboard:copy="content" v-clipboard:success="onCopy" v-clipboard:error="onError">
        {{$t('mine.manageInfo.copy')}}
      </div>
    </van-dialog>

    <van-popup v-model="openChangePsw" position="right">
      <div class="content">
        <van-nav-bar :z-index="1000" 
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
      this.wallet_name = this.walletDB.accounts[this.addr].name;
    },
    
    onClickRight() {
      if (this.wallet_name == this.walletDB.accounts[this.addr].name) {
        return false
      } else {
        this.lbtcWalletDB.changeName(this.addr, this.wallet_name);
        this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then( r=> {
            this.manageInfoInit();
            Toast.success({
              duration: 1500,
              message: this.$t('mine.manageInfo.msg1')
            });
        })
      }
    },

    itemClick(type) {
      this.openPassDialog = true;
      this.type = type;
    },

    beforePassDialogClose(action, done) {
      if (action == "confirm") {
        if (this.psw == this.walletDB.accounts[this.addr].password) {
          if (this.type == 'prv') {
            this.content = this.walletDB.accounts[this.addr].privateKey;       
            done();
            this.openExportDialog = true;
          } else if (this.type == 'mnemonic'){
            done();
            this.$router.push({ path: "/create-mnemonic", query: { wallet_info: JSON.stringify(this.walletDB.accounts[this.addr]), from: 'manageInfo'}});
          } else if (this.type == 'delete') {
            this.lbtcWalletDB.deleteaccount(this.addr);
            Toast.success({
              duration: 1500,
              message: this.$t('mine.manageInfo.msg2')
            });
            this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then( r=> {
              if (this.walletDB.current) {
                this.$router.push({ path: '/mine-manage'});
              } else {
                this.$router.push({ path: "/create-index" });
              }
            })
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

    awaitT() {
      return new Promise((resolve) => {
        this.$http.get(this.$api.api.getHeight, { addr: this.addr }).then((r) => {
          resolve(r.msg)
        })
      })
    },

    resyncData(address) {

      this.$dialog.confirm({
        title: this.$t('mine.manageInfo.confirmResync'),
        cancelButtonText: this.$t('commom.passDialog.cancelButtonText'),
        confirmButtonText: this.$t('commom.passDialog.confirmButtonText')
      }).then(() => {
        // on confirm
        this.$store.commit('setUpdataStatus', false);
        Toast.loading({
          duration: 0,
          mask: true,
          message: this.$t('import.msg3')
        });
  
        this.$store.dispatch('getWalletTxs', {
          address: address,
          currentHeight: 1
        }).then( data => {
          this.lbtcWalletDB.accounts[this.addr].histroy = [];
          this.lbtcWalletDB.accounts[this.addr].availableTxs = [];
          this.lbtcWalletDB.accounts[this.addr].availableBalance = 0;
          this.lbtcWalletDB.accounts[this.addr].unavailableTxs = [];
          this.lbtcWalletDB.accounts[this.addr].unavailableBalance = 0;
          this.lbtcWalletDB.insertHistroy(address, data);
          this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then(r => {
            Toast.clear();
            this.$store.commit('setUpdataStatus', true);
          })
        })
      }).catch(() => {
        // on cancel
      });

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
      if (this.oldPsw.value != this.walletDB.accounts[this.addr].password) {
        Toast.fail({
          duration: 1500,
          message: this.$t('mine.manageInfo.msg9')
        });
        return false
      }
      if (this.newPsw.value == this.walletDB.accounts[this.addr].password) {
        Toast.fail({
          duration: 1500,
          message: this.$t('mine.manageInfo.msg10')
        });
        return false
      }
      this.lbtcWalletDB.changePassword(this.addr, this.newPsw.value);
      this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then( r=> {
        this.manageInfoInit();
        Toast.success({
          duration: 1500,
          message: this.$t('mine.manageInfo.msg11')
        });
        setTimeout(() => {
          this.cloesChangePsw();
        }, 500)
      })
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
      if (this.walletDB.accounts[addr].unavailableBalance) {
        this.showMoreBalance = !this.showMoreBalance;
      } else {
        return false
      }
    }
  },
  destroyed(){},
  beforeRouteLeave (to, from, next) {
    this.$dialog.close();
    next();
  }
}
</script>