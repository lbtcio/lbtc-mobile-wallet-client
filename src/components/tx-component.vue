<style lang="scss" scoped>
#tx-component{
  .warn-button {
    color: #fff;
    background-color: #e51313;  
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
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
  .van-popup--bottom {
    max-height: 80%;
  }
  .nodes-content {
    max-height: 100px;
    overflow-y: auto;
  }
  .tag {
    float: left;
    background-color: rgba(29, 90, 163, 0.11);
    margin: 2px;
    padding: 2px 4px;
    font-size: 12px;
  }
}
</style>
<template>
  <div id="tx-component">
    <slot></slot>

    <!-- Confirm TxInfo Popup -->
    <van-popup v-model="openConfirmInfo" position="bottom" :close-on-click-overlay="false">
      <div class="container confirm-info-container">
        <div class="popup-title" style="border:none">
          {{$t('commom.tx.confirmInfoTX')}}
        </div>
        <div class="cancel-button" @click="openConfirmInfo = false">
          <img src="https://lbtc.io/wallet/static/img/close.png" alt="">
        </div>
        <table class="confirm-info-table" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoType')}}:</td>
            <td class="confirm-info-content">
              <span v-if="isOPRETURN">{{value['confirmTxType']}}</span>
              <span v-if="!isOPRETURN">{{$t('wallet.send.confirmInfoTxType')}}</span>
            </td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoPayaddr')}}:</td>
            <td class="confirm-info-content hash">{{walletDB.current}}</td>
          </tr>
          <!-- OP_RETURN start -->
          <tr class="confirm-info-item" v-if="isOPRETURN">
            <td class="confirm-info-title">{{value['confirmTxName']}}:</td>
            <td class="confirm-info-content">
              <div class="nodes-content" v-if="isArray(value['confirmTxContent'])">
                <span class="tag" v-for="item in value['confirmTxContent']">{{item.name}}</span>
              </div>
              <span v-if="!isArray(value['confirmTxContent'])">{{value['confirmTxContent']}}</span>  
            </td>
          </tr>
          <!-- OP_RETURN end -->

          <!-- Send start -->
          <tr class="confirm-info-item" v-if="coinselectStatus && !isOPRETURN">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoReceiveAddr')}}:</td>
            <td class="confirm-info-content hash">{{outputs[0].address}}</td>
          </tr>
          <tr class="confirm-info-item" v-if="coinselectStatus && !isOPRETURN">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoSendMoney')}}:</td>
            <td class="confirm-info-content">{{decimal(outputs[0].value).div(wConfig.point).toNumber()}}</td>
          </tr>
          <!-- Send end -->
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoFees')}}:</td>
            <td class="confirm-info-content">{{decimal(fee).div(wConfig.point).toNumber()}}</td>
          </tr>
        </table>
        <div class="input-group">
          <button class="default confirm-info-button" @click="openPassDialog = true" :class="{disabled: !coinselectStatus}">{{$t('commom.tx.dialogConfirm')}}</button>
        </div>
      </div>
    </van-popup>

    <!-- Password Dialog -->
    <van-dialog
      v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('commom.passDialog.confirmButtonText')" 
      :cancelButtonText="$t('commom.passDialog.cancelButtonText')" 
      :before-close="beforePassDialogClose">
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.passDialog.dialogTitle')}}</div>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw">
      </div>
    </van-dialog>

    <!-- TxID Dialog -->
    <van-dialog :show-confirm-button="false" v-model="openTxIDDialog" confirm-button-text="" >
      <div class="dialog-title" style="margin-top: 28px;">
        {{$t('commom.tx.dialogTxID')}}
        <img class="dialog-cloes" src="https://lbtc.io/wallet/static/img/close.png" @click="closeTxIDDialog">
      </div>
      <div class="dialog-content">
        <div class="dialog-content-box">
          {{sendSuccess}}
        </div>
      </div>
      <div class="dialog-button default-color text-center" @click="doCopy(sendSuccess)">
        {{$t('commom.tx.dialogCopy')}}
      </div>
    </van-dialog>

    <!-- Warn Dialog -->
    <van-dialog
      v-model="openWarnDialog"
      confirm-button-text="" 
      :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">
        {{$t('commom.tx.dialogError')}}
      </div>
      <div class="dialog-content">
        <div class="dialog-content-box">
          {{sendError}}
        </div>
      </div>
      <div class="dialog-button warn-button text-center" @click="closeWarnDialog">
        {{$t('commom.tx.dialogConfirm')}}
      </div>
    </van-dialog>


  </div>
</template>

<script>
import { Toast } from "vant";
import QrcodeVue from "qrcode.vue";
export default {
  components:{},
  name: '',
  props:{
    value: null,
    isOPRETURN: Boolean,
    OP_CODE: String,
    callBack: {
      type: '',
      content: ''
    }
  },
  data(){
    return {
      openPassDialog: false,
      psw: '',
      openTxIDDialog: false,
      sendSuccess: '',
      openWarnDialog: false,
      sendError: '',
      openConfirmInfo: false,
      confirmInfo: {},
      coinselectStatus: false,
      inputs: Array,
      outputs: Array,
      fee: 0
    }
  },
  computed:{},
  created(){
    
  },
  computed: {},
  methods:{

    toTXcontent(){
      if (Object.keys(this.walletDB.accounts[this.walletDB.current].confirmingTx).length) {
        Toast.fail({
          duration: 2000,
          message: this.$t('commom.tx.notConfirmed')
        })
        return false
      }

      let res;
      this.walletDB.accounts[this.walletDB.current].availableTxs.reverse();
      if (this.isOPRETURN) {
        res =  this.Wallet.otherTxCoinselect(this.value.fee, this.walletDB.accounts[this.walletDB.current].availableTxs, this.walletDB.current);
      } else {
        res = this.Wallet.coinselect(this.walletDB.accounts[this.walletDB.current].availableTxs, this.value);
      }
      let { inputs, outputs, fee } = res;
      if (inputs && outputs && fee) {
        this.inputs = inputs;
        this.outputs = outputs;
        this.fee = fee;
        this.coinselectStatus = true;
        this.openConfirmInfo = true;
      } else {
        this.$emit('update:callBack', {
          type: 0, 
          content: this.$t('commom.tx.insufficientFee')
        });
      }
    },
    
    beforePassDialogClose(action, done) {
      if (action === 'confirm') {
        if (this.walletDB.accounts[this.walletDB.current].password == this.psw) {
          done();
          this.openConfirmInfo = false;
          this.send();
        } else {
          Toast.fail({
            duration: 1000,
            message: this.$t('commom.tx.incorrect')
          });
          done(false);
        }
      } else {
        done();
      }
      this.psw = '';
    },

    send() {
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t('commom.tx.packing')
      });

      window.setTimeout(() => {
        let txHex;

        if (this.isOPRETURN) {
          txHex = this.Wallet.makeOPreturnTransaction(this.walletDB.accounts[this.walletDB.current].privateKey, this.inputs, this.outputs, this.value.OP_RETURN);
        } else {
          txHex = this.Wallet.makeTransaction(this.walletDB.accounts[this.walletDB.current], this.inputs, this.outputs);
        }
  
        Toast.loading({
          duration: 0,
          mask: true,
          message: this.$t('commom.tx.sending')
        });
  
        this.$http.get(this.$api.api.msendrawtransaction, { param: txHex, addr: this.walletDB.current }).then(result => {                                                      
          
          window.setTimeout(() => {
            Toast.success({
              duration: 0,
              message: this.$t('commom.tx.success')
            });

            let confirmingTxInfo = this.Wallet.makeTxDetail(result.msg, this.walletDB.current, this.inputs, this.outputs, this.decimal(this.fee).div(this.wConfig.point).toNumber(), Date.parse(new Date()), 's');

            this.lbtcWalletDB.insertConfirmingTx(this.walletDB.current, confirmingTxInfo);
            this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then( r=> {
              window.setTimeout(() => {
                Toast.clear();
                this.sendSuccess = result.msg;
                this.openTxIDDialog = true;
              }, 1000)
            })
          }, 3500);

        }).catch(error => {
          Toast.clear();
          this.sendError = String(error);
          this.openWarnDialog = true;
        })
      }, 200)

    },

    sendAll() {
      let inputsSize  = this.decimal(this.walletDB.accounts[this.walletDB.current].availableTxs.length).mul(148).toNumber(),
          outputsSize = this.decimal(1).mul(34).toNumber(),
          txSize      = this.decimal(10).plus(inputsSize).plus(outputsSize).toNumber(),
          fee         = this.decimal(this.wConfig.feeRate).mul(txSize).div(this.wConfig.point).toNumber(),
          value       = this.decimal(this.walletDB.accounts[this.walletDB.current].availableBalance).minus(fee).toNumber();

      if (value > 0) {
        this.$emit('update:callBack', {
          type: 1,  // 1 : send all
          content: value
        });
      } else {
        this.$emit('update:callBack', {
          type: 0,  // 0 : count warn
          content: this.$t('commom.tx.insufficient')
        });
      }

    },

    closePassDialog() {
      this.$emit('update:openWarnDialog', false);
    },

    closeTxIDDialog() {
      this.$store.commit('isFreshWallet', true);
      this.$store.commit('setUpdataStatus', true);

      this.openTxIDDialog = false;
      this.$router.push({ path: '/main-index/wallet'});
    },

    closeWarnDialog() {
      this.openWarnDialog = false;
      this.sendError = '';
    },

    doCopy(e) {
      // is app
      if (window.plus && this.isplusReady) {
        this.appClipbordText(e).then( r => {
          Toast.success({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title7')
          });
        }, err => {
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title8')
          });
        })
      // is h5
      } else {
        this.$copyText(e).then( r => {
          Toast.success({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title7')
          });
        }, err => {
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title8')
          });
        })
      }
    }

    // onCopy() {
    //   Toast.success({
    //     duration: 1500,
    //     message: this.$t('commom.tx.copied')
    //   });
    // },

    // onError() {
    //   Toast.fail({
    //     duration: 1500,
    //     message: this.$t('commom.tx.copyError')
    //   });
    // },

  }
}
</script>