<style lang="scss" scoped>
#wallet-send{
  .popup-title {
    padding: 18px 0;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .addrs-add {
    padding: 40px 0;
    font-size: 14px;
  }
  .van-popup--bottom {
    max-height: 80%;
  }
  .cancel-button {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    img {
      width: 100%;
    }
  }
  .error-msg {
    position: absolute;
    color: #e51313;
    font-size: 12px;
    margin: 0 5px;
  }
  .dialog-content {
    letter-spacing: 0;
    word-break: break-all;
  }
  .warn-button {
    color: #fff;
    background-color: #e51313;  
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
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
}
</style>
<template>
  <div id="wallet-send">
    <van-nav-bar
      :title="$t('wallet.send.navTitle')"
      left-arrow
      fixed 
      @click-left="onClickLeft"
    />
    <div class="container fixed-container">
      <div class="input-with-label-group">
        <div class="input-with-label-item">
          <label for="fromAddr">
            {{$t('wallet.send.payAddr')}}
          </label>
          <input type="text" id="fromAddr" v-model="current_wallet" readonly />
        </div>
        <div class="input-with-label-item">
          <label for="toAddr">
            {{$t('wallet.send.receiveAddr')}}
          </label>
          <span class="addrs" @click="openAddrs = true">
            <van-icon name="pending-orders" />
          </span>
          <input type="text" id="toAddr" :placeholder="$t('wallet.send.receiveAddrPlaceholder')" v-model.trim="toAddr.value"/>
          <label for="repass" class="error-msg" v-if="toAddr.msg">{{toAddr.msg}}</label>
        </div>
        <div class="input-with-label-item">
          <label for="value">
            {{$t('wallet.send.payMoney')}}
          </label>
          <span class="addr-balance">
            {{$t('wallet.send.balance')}}:{{unspent.availablebalance}} LBTC
          </span>
          <input type="number" id="value" :placeholder="$t('wallet.send.moneyInputPlaceholder')" v-model="count.value" @change="checkCount"/>
          <label for="repass" class="error-msg" v-if="count.msg">{{count.msg}}</label>
        </div>
      </div>
      <div class="input-group" style="padding-top: 80px">
        <button class="default" @click="next()" :class="{disabled: !unspentStatus}">{{$t('wallet.send.next')}}</button>
      </div>
    </div>

    <van-popup v-model="openAddrs" position="bottom">
      <div class="container">
        <div class="popup-title">{{$t('wallet.send.selectionAddr')}}</div>
        <div class="addrs-content" v-if="addrs">
          <div class="addrs-item" v-for="(item, index) in addrs" @click="selectAddr(item.addr)">
            <div class="addrs-item-name">{{item.name}}</div>
            <div class="addrs-item-addr">{{item.addr}}</div>
            <div class="addrs-item-other">{{item.other}}</div>
          </div>
        </div>
        <div class="text-center addrs-add" >
          <span v-if="!addrs">{{$t('wallet.send.noAddrContent')}} </span>
          <a href="#/mine-addrInfo">{{$t('wallet.send.noAddrAddAddr')}}</a>
        </div>
      </div> 
    </van-popup>

    <van-popup v-model="openConfirmInfo" position="bottom" :close-on-click-overlay="false">
      <div class="container confirm-info-container">
        <div class="popup-title" style="border:none">
          {{$t('commom.tx.confirmInfoTX')}}
        </div>
        <div class="cancel-button" @click="closeConfirmInfoF">
          <img src="http://lbtc.io/wallet/static/img/close.png" alt="">
        </div>
        <table class="confirm-info-table" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoType')}}:</td>
            <td class="confirm-info-content">{{$t('wallet.send.confirmInfoTxType')}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoPayaddr')}}:</td>
            <td class="confirm-info-content">{{current_wallet}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoReceiveAddr')}}:</td>
            <td class="confirm-info-content">{{toAddr.value}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoSendMoney')}}:</td>
            <td class="confirm-info-content">{{count.value}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoFees')}}:</td>
            <td class="confirm-info-content">{{fees}}</td>
          </tr>
        </table>
        <div class="input-group">
          <button class="default confirm-info-button" @click="openPassDialog = true" :class="{disabled: !coinselectStatus}">{{$t('commom.tx.dialogConfirm')}}</button>
        </div>
      </div>
    </van-popup>

    <van-dialog
      v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('commom.passDialog.confirmButtonText')" 
      :cancelButtonText="$t('commom.passDialog.cancelButtonText')" 
      :before-close="beforePassDialogClose"
    >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.passDialog.dialogTitle')}}</div>
      <div class="dialog-password">
        <input type="password" v-model="psw">
      </div>
    </van-dialog>

    <van-dialog v-model="openWarnDialog" confirm-button-text="" :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.tx.dialogError')}}</div>
      <div class="dialog-content">
        {{errorMsg}}
      </div>
      <div class="dialog-button warn-button text-center" @click="openWarnDialog = false">
        {{$t('commom.tx.dialogConfirm')}}
      </div>
    </van-dialog>

    <van-dialog v-model="openTxIDDialog" confirm-button-text="" :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">
        {{$t('commom.tx.dialogTxID')}}
        <img class="dialog-cloes" src="http://lbtc.io/wallet/static/img/close.png" @click="closeTxIDDialog">
      </div>
      <div class="dialog-content">
        <div class="show-mnemonic">
          {{txHash}}
        </div>
      </div>
      <div class="dialog-button default-color text-center" v-clipboard:copy="txHash" v-clipboard:success="onCopy" v-clipboard:error="onError">
        {{$t('commom.tx.dialogCopy')}}
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { Toast } from 'vant';
import { Dialog } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      current_wallet:'',
      info: {},
      unspent: {},
      unspentStatus: false,
      inputs: [],
      outputs: [],
      point: 100000000,
      fees: 0,
      coinselectStatus: false,
      current_time: '',
      OP_RETURN: '',
      toAddr: {
        value: '',
        msg: '',
        status: false
      },
      count: {
        value: '',
        msg: '',
        status: false
      },
      psw: '',
      openAddrs: false,
      addrs: [],
      openConfirmInfo: false,
      openPassDialog: false,
      openWarnDialog: false,
      errorMsg: '',
      openTxIDDialog: false,
      txHash: ''
    }
  },
  computed:{},
  created(){
    this.sendInit();

  },
  mounted(){},
  methods:{
    sendInit() {
      window.setTimeout( ()=> {
        Toast.clear()
      },1000)
      this.localforage.getItem('current_wallet').then( current_wallet => {
        if (current_wallet) {
          this.current_wallet = current_wallet;
          this.localforage.getItem('wallet_list').then( list => {
            if (list) {
              this.info = list[current_wallet]
            }
          });
          this.localforage.getItem(current_wallet + '+unspent').then( list => {
            if (list) {
              this.unspent = list;
              this.unspentStatus = true;
            }
          })
        }
      })
      this.localforage.getItem('addrs').then( addrs => {
        this.addrs = addrs;
      })
      if (this.$route.query.toaddr) {
        this.toAddr.value = this.$route.query.toaddr;
      }
    },

    onClickLeft() {
      this.$router.push({ path:'/main-index' });
    },

    selectAddr(param) {
      this.toAddr.value = param;
      this.openAddrs = false;
    },

    closeConfirmInfoF(){
      this.openConfirmInfo = false;
      this.fees = 0;
      this.inputs = [];
      this.outputs = [];
      this.coinselectStatus = false;
    },

    checkToAddr() {
      if (this.toAddr.value == '') {
        this.toAddr.msg = this.$t('wallet.send.checkWarnMsg1');
        this.toAddr.status = false;
      } else if (this.toAddr.value.length > 34 || this.toAddr.value.length < 26) {
        this.toAddr.msg = this.$t('wallet.send.checkWarnMsg2');
        this.toAddr.status = false;
      } else {
        this.toAddr.msg = '';
        this.toAddr.status = true;
      }
    },

    checkCount() {
      if (!this.count.value && Number(this.count.value) == 0 ) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg3');
        this.count.status = false;
      } else if (Number(this.count.value) <= 0) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg3');
        this.count.status = false;
      } else if (Number(this.count.value) + this.fees > this.unspent.availablebalance) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg4');
        this.count.status = false;
      } else if (Number(this.count.value) < 0.000005) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg5');
        this.count.status = false;
      } else if (this.count.value.indexOf('.') >= 0 && this.count.value.split(".")[1].length > 8) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg6');
        this.count.status = false;
      } else {
        this.count.msg = '';
        this.count.status = true;
      }
    },
    
    next() {
      this.checkToAddr();
      this.checkCount();
      if (this.toAddr.status && this.count.status) {
        this.coinselect();
        this.openConfirmInfo = true;
      }
    },

    coinselect() {
      let targets = [{
        address: this.toAddr.value,
        value: this.calc.mul(this.count.value, this.point)
      }];
      this.unspent.available.reverse();
      let { inputs, outputs, fee } = this.Wallet.coinselect(this.unspent.available, targets);
      if (inputs && outputs) {
        this.fees = this.calc.div(fee, this.point);
        this.inputs = inputs;
        this.outputs = outputs;
        this.coinselectStatus = true;
        return true
      } else {
        this.count.msg = this.$t('commom.tx.msg4');;
        this.count.status = false;
      }
    },

    beforePassDialogClose(action, done) {
      if (action === 'confirm') {
        if (this.psw == this.info.psw) {
          window.setTimeout(() => {
            this.openConfirmInfo = false;
            done();
            setTimeout(() => {
              this.send();
            }, 100)
          }, 100);
        } else {
          Toast.fail({
            duration: 1500,
            message: this.$t('commom.tx.msg5')
          });
          done(false);
        }
      } else {
        done();
      }
      this.psw = "";
    },

    send() {
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t('commom.tx.msg6')
      });
      window.setTimeout( () => {
        this.makeTX(this.current_wallet, this.toAddr.value, this.count.value)
      }, 100)
    },

    makeTX(currentAddr, toAddr, money) {
      let prv = this.info.prv;

      this.Wallet.newTransaction()
        .then(txb => {
          
          let keyPair = this.Wallet.ecPairFromWIF(prv);
          this.inputs.forEach((item, index) => {
            txb.addInput(item.txId, item.vout)
          });
          txb.addOutput(this.outputs[0].address, this.outputs[0].value); 
          txb.addOutput(currentAddr, this.outputs[1].value);
          for (let index = 0; index < this.inputs.length; index++) {
            txb.sign(index, keyPair);
          }
          return Promise.resolve(txb.build().toHex());
        })
        .then(hex => {
          this.sendRq({ param: hex, addr: currentAddr });
        })
        .catch(error => {
          Toast.clear();
          this.errorMsg = String(error);
          this.openWarnDialog = true;
        })
    },

    sendRq(params) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t('commom.tx.msg7')
      });
      this.$http
        .get(this.$api.api.msendrawtransaction, params)
        .then(result => {
          window.setTimeout(() => {
            if (result.error) {
              Toast.fail(result.msg);
            } else {
              this.txHash = result.msg;
              Toast.success({
                duration: 0,
                message: this.$t('commom.tx.msg8')
              });
            }
            window.setTimeout(() => {
              Toast.clear();
              this.openTxIDDialog = true;
            }, 1000)
          }, 2000);
        });
        
    },

    closeTxIDDialog() {
      this.$store.commit('isFreshInHome', {
        isFreshInHome: true,
      });
      this.$router.push({ path: '/main-index' });
    },

    onCopy() {
      Toast.success({
        duration: 1500,
        message: this.$t('commom.tx.msg9')
      });
    },

    onError() {
      Toast.fail({
        duration: 1500,
        message: this.$t('commom.tx.msg10')
      });
    },
    
    // utxos(listUnspent, money) {
    //   let arry = [],
    //       sum = 0,
    //       inputCount = 0,
    //       len = 0,
    //       fees,
    //       change,
    //       index;
    //   listUnspent.reverse()
    //   console.log(listUnspent)
    //   for (let i = 0; i < listUnspent.length; i++) {
    //     sum = sum +  listUnspent[i].amount;
    //     inputCount = inputCount + 1;
    //     arry.push(listUnspent[i]);
    //     if (sum > money) {
    //       console.log(sum)
    //       console.log(money)
    //       break
    //     }
    //   }
    //   len = this.calc.mul(inputCount, 148) + this.calc.mul(2, 34) + 10;
    //   fees = Math.ceil(this.calc.div(len, 1000));
    //   change = sum - fees

    //   console.log(len)
    //   console.log(fees)

    //   return arry
    // },

  },
  destroyed(){},
  watch:{},
}
</script>