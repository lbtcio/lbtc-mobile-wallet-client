<style lang="scss" scoped>
#vote-votecancel {
  height: 100vh;
  .fixed-container {
    padding-top: 70px;
  }
  .van-checkbox__icon .van-icon {
    width: 15px;
    height: 15px;
  }
  .listItem {
    display: flex;
    padding: 5px 0;
    // border-bottom: 1px solid #eee;
    width: 100%;
    align-items: center;
    font-size: 12px;
    & > * {
      padding: 5px;
    }
    .a {
      flex: 0;
    }
    .b {
      flex: 1;
      word-break: break-all;
      line-height: 1.4;
    }
    .c {
      flex: 2;
      word-break: break-all;
    }
    .d {
      flex: 0;
    }
  }
  .listItemTitle {
    padding: 0 15px;
    height: 36px;
    position: fixed;
    top: 36px;
    background: #fff;
    z-index: 1;
    height: 36px;
    box-shadow: 0px 1px 1px 0px rgba(104, 147, 197, 0.35);
    border-bottom: none;
    .a {
      width: 50px;
    }
    .d {
      width: 100px;
    }
  }
  .searchBox {
    position: fixed;
    top: 41px;
    z-index: 2;
    width: 100%;
    height: 26px;
    padding: 0 20px;
    font-size: 12px;
    input {
      outline: none;
      height: 100%;
      width: 100%;
      border: none;
      box-shadow: 1px 1px 1px 1px rgba(104, 147, 197, 0.35);
      border-radius: 30px;
      padding: 0 40px 0 30px;
        background-color: #f9f9f9;
    }
    .icon {
      z-index: 3;
      position: absolute;
      display: block;
      width: 26px;
      height: 26px;
      top: 0;
      bottom: 0;
      right: 25px;
      color: #1d5aa3;
      font-size: 16px;
      &::before {
        position: absolute;
        top: 5px;
        bottom: 0;
        right: 0;
        left: 0; 
      }
    }
  }
  .buttom-button {
    position: fixed;
    bottom: -1px;
    left: 0;
    right: 0;
    display: flex;
    font-size: 14px;
    box-shadow: 1px 1px 1px 1px rgba(104, 147, 197, .35);
    & > div {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .a {
      flex: 1;
      background-color: #fff;
    }
    .b {
      flex: 2;
      
    }
  }
  .list-enter-active {
    transition: all 1s;
  }
  .list-leave-active {
    transition: all 0.2s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
  .tag {
    float: left;
    background-color: rgba(29, 90, 163, 0.11);
    margin: 2px;
    padding: 2px 4px;
    font-size: 12px;
  }
  .nodes-content {
    max-height: 100px;
    overflow-y: auto;
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
  .warn-button {
    color: #fff;
    background-color: #e51313;  
  }
}
</style>
<template>
  <div id="vote-votecancel">

    <van-nav-bar :title="$t('vote.votecancel.navTitle')" fixed left-arrow @click-left="onClickLeft">
      <!-- <van-icon :name="navSearch ? 'close' : 'search'" slot="right" /> -->
    </van-nav-bar>

    <div class="listItem listItemTitle">
      <div class="a">
        <van-checkbox style="opacity: 0;"></van-checkbox>
      </div>
      <div class="b">
        {{$t('vote.vote.thead.td1')}}
      </div>
      <div class="c">
        {{$t('vote.vote.thead.td2')}}
      </div>
      <div class="d">
        #
      </div>
    </div>

    <scroller class="container fixed-container" :on-refresh="refresh" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">
      <div>
        <van-checkbox-group v-model="selectList">
          <van-cell-group is="transition-group" name="list">
            <van-cell v-show="item.isShow" v-for="(item, index) in votesList" :key="item.delegate + '-' + index"> 
              <div class="listItem">
                <div class="a">
                  <van-checkbox :name="item" :disabled="item.disabled" ref="checkboxes" />
                </div>
                <div class="b" @click="toggle(index)">
                  {{item.name}}
                </div>
                <div class="c" @click="toggle(index)">
                  {{item.count}}
                </div>
                <div class="d" @click="toggle(index)">
                  {{item.id}}
                </div>
              </div>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </scroller>

    <div class="buttom-button">
      <div class="buttom-button-right a">{{$t('vote.votecancel.button1')}} {{ selectList.length }}</div>
      <div class="buttom-button-left default-color b" :class="( !unspentStatus && this.votesList == selectList.length) ? 'disabled' : ''" @click="vote">{{$t('vote.votecancel.button2')}}</div>
    </div>

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
            <td class="confirm-info-content">{{$t('vote.votecancel.confirmInfoTxType')}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoPayaddr')}}:</td>
            <td class="confirm-info-content">{{current_wallet}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoName')}}:</td>
            <td class="confirm-info-content">
              <div class="nodes-content">
                <span class="tag" v-for="item in selectionResArr">{{item.name}}</span>
              </div>
            </td>
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
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.passDialog.dialogTitle')}}</div class>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw">
      </div>
    </van-dialog>

    <van-dialog v-model="openWarnDialog" confirm-button-text="" :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.tx.dialogError')}}</div class>
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
import QrcodeVue from "qrcode.vue";
import { Toast } from "vant";
export default {
  components: {
    QrcodeVue
  },
  props: {},
  data() {
    return {
      current_wallet: '',
      navSearch: false,
      openPassDialog: false,
      wallet_info: {},
      searchText: '',
      psw: '',
      count: 0,
      selectList: [],
      selectionResArr: [],
      unspent: {},
      unspentStatus: false,
      inputs: [],
      outputs: [],
      point: 100000000,
      fees: 0,
      coinselectStatus: false,
      psw: '',
      msg: '',
      openConfirmInfo: false,
      openPassDialog: false,
      openWarnDialog: false,
      errorMsg: '',
      openTxIDDialog: false,
      txHash: ''
    };
  },
  computed: {
    forgeList() {
      let res = this.$store.state.vote.forgeList;
      let votesList = this.$store.state.vote.votesList;
      res.forEach((item, index) => {
        item.value = false;
        item.isShow = true;
        item.id = index + 1;
        votesList.forEach((item0, index0) => {
          if (item.address == item0.delegate) {
            item.disabled = true;
          }
        })
      });
      return res
    },
    votesList() {
      let res = this.$store.state.vote.votesList;
      res.forEach((item, index) => {
        item.value = false;
        item.id = index + 1;
        item.isShow = true;
      });
      return res
    },
  },
  created() {
    this.voteInit();
  },
  mounted() {},
  methods: {
    voteInit() {
      Promise.all([this.localforage.getItem("wallet_list"), this.localforage.getItem("current_wallet")]).then( data => {
        if (data) {
          this.current_wallet = data[1];
          this.wallet_info = data[0][data[1]];
          this.localforage.getItem(this.current_wallet + '+unspent').then( list => {
            if (list) {
              this.unspent = list;
              this.unspentStatus = true;
            }
          })
        }
      })
    },

    onClickLeft() {
      this.$router.back();
    },

    toggle(index) {
      if (this.$refs.checkboxes[index].checked) {
        this.$refs.checkboxes[index].toggle();
      } else {
        this.$refs.checkboxes[index].toggle();
      }
    },

    refresh(done) {
      this.voteInit();
      setTimeout(() => {
        done();
      }, 1000);
    },

    vote() {
      let arr = [];
      this.selectList.forEach((item, index) => {
        let flag = true;
        for (let i = 0; i < this.votesList.length; i++) {
          if (this.votesList[i].delegate == item.address) {
            flag = false
            break
          }
        }
        if (flag) {
          arr.push(item)
        }
      });
      this.selectionResArr = arr;

      if (!this.selectionResArr.length) {
        Toast({
          duration: 1500,
          message: this.$t('commom.tx.selectAgent')
        })
        return false
      }

      if (this.otherTxCoinselect(1, this.unspent.available)) {
        this.openConfirmInfo = true;

      } else {
        return false
      }
    },

    otherTxCoinselect(type, listUnspent) {
      let fee, sum = 0, inputs = [], outputs = [];
      switch (type) {
        case 0:
          fee = 1 * this.point
          break;
        case 1:
          fee = 0.01 * this.point
          break;
        case 2:
          fee = 0.01 * this.point
          break;
        default:
          break;
      }
      for (let i = 0; i < listUnspent.length; i++) {
        sum = sum +  listUnspent[i].value;
        inputs.push(listUnspent[i]);
        if (sum > fee) {
          break
        }
      }
      if (sum <= fee) {
        this.msg = this.$t('commom.tx.msg4');
        this.status = false;
        return false
      }
      outputs[0] = {
        'address': 'OP_RETURN',
        'value': 0
      }
      outputs[1] = {
        'value': this.calc.sub(sum, fee)
      }
      this.fees = this.calc.div(fee, this.point);
      this.inputs = inputs;
      this.outputs = outputs;
      this.coinselectStatus = true;
      return true
    },

    beforePassDialogClose(action, done) {
      if (action === 'confirm') {
        if (this.wallet_info.psw == this.psw) {
          window.setTimeout(() => {
            this.openConfirmInfo = false;
            done();
            setTimeout(() => {
              this.send();
            }, 100)
          }, 100);
        } else {
          Toast.fail({
            duration: 1000,
            message: this.$t('commom.tx.msg5')
          });
          done(false);
        }
      } else {
        done()
      }
      this.psw = '';
    },

    closeConfirmInfoF(){
      this.openConfirmInfo = false;
      this.inputs = [];
      this.outputs = [];
      this.coinselectStatus = false;
      this.selectionResArr = [];
    },

    send() {
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t('commom.tx.msg6')
      });
      window.setTimeout( () => {
        this.makeTX(this.current_wallet)
      }, 100)
    },


    makeTX(currentAddr) {
      let addrs = [];
      let prv = this.wallet_info.prv;
      
      this.selectionResArr.forEach((item, index) => {
        addrs.push(item.delegate);
      });

      let OP_RETURN = this.LBTCtools.VoteForgedNode(addrs, "c2");

      this.Wallet.newTransaction().then(txb => {
        
        this.inputs.forEach((item, index) => {
          txb.addInput(item.txId, item.vout)
        });

        let arryyy = this.Xreplace(OP_RETURN, 2);
        let dataaaaa = Buffer.from(arryyy);
        const embeddddd = this.bitcoin.payments.embed({ data: [dataaaaa] })

        txb.addOutput(embeddddd.output, 0);
        if (this.outputs[1].value) {
          txb.addOutput(currentAddr, this.outputs[1].value);
        }

        let keyPair = this.Wallet.ecPairFromWIF(prv);
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

  },
  destroyed() {},
  watch: {
    searchText(newVal, oldVal) {
      if (newVal != oldVal) {
        this.searchData();
      }
    }
  }
};
</script>