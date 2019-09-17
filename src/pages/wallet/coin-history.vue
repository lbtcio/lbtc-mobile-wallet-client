<style lang="scss" scoped>
#mine-tx-his{
  height: 100vh;
  .history-title {
    font-size: 12px;
    letter-spacing: 0px;
  }
  .wallet-header {
    .header-top {
      padding: 20px 0;
    }
    .header-logo {
      width: 100px;
      height: auto;
    }
    .header-balance {
      font-size: 20px;
      font-weight: 600;
      color: #1d5aa3;
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
      }
    }
    .header-bottom {
      display: flex;
      padding: 10px 0;
    }
    .header-bottom-item {
      flex: 1;
      color: #666;
      font-size: 14px;
      img {
        height: 26px;
        width: auto;
      }
    }
    .sign {
      font-size: 14px;
      font-weight: 400;
    }
    .note {
      font-size: 12px;
      border: 1px solid #d36800;
      border-radius: 2px;
      color: #d36800;
      padding: 0px 2px;
      margin-left: 4px;
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
  }
  .cell-group {
    .cell-logo {
      width: 26px;
      height: 26px;
    }
    .title {
      font-size: 14px;
    }
    .label {
      font-size: 12px;
      color: #999;
    }
    .cell-function {
      font-size: 12px;
    }
  }
  .buttom-button {
    position: fixed;
    background-color: #fff;
    box-shadow:0px 1px 9px 0px rgba(29,90,163,0.33);
    bottom: -1px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    img {
      height: 20px;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
    .buttom-button-item {
      flex: 1;
      height: 48px;
      line-height: 48px;
      text-align: center;
      align-items: center;
    }
    .buttom-button-middle {
      height: 36px;
      width: 1px;
      border-color: #e5e5e5;
      background-color: #e5e5e5;
    }
  }
}
</style>
<template>
  <div id="mine-tx-his">
    <van-nav-bar :z-index="1000" :title="coin" fixed left-arrow @click-left="isBack()" />

    <scroller class="fixed-container" :on-refresh="refresh" :on-infinite="infinite" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">

      <div class="wallet-header underline">
        <div class="header-top text-center">
          <img class="header-logo" src="https://lbtc.io/wallet/static/img/logo.png">
          <div class="header-balance" :class="showMoreBalance ? 'show-more-balance' : ''">
            <span @click.stop="moreBalance" class="balance">
              {{decimal(availableBalance).plus(unavailableBalance).toNumber()}} LBTC
            </span>
            <span @click.stop="moreBalance" class="more" v-if="unavailableBalance">
              <van-icon name="arrow" />
            </span>
            <div class="more-balance-content" v-if="showMoreBalance">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>{{$t('wallet.index.availablebalance')}}:</td>
                  <td><span>{{availableBalance}} </span><span class="sign">LBTC</span></td>
                </tr>
                <tr>
                  <td>{{$t('wallet.index.unavailablebalance')}}:</td>
                  <td><span>{{unavailableBalance}} </span><span class="sign">LBTC</span></td>
                </tr>
              </table>
            </div>
            
          </div>
        </div>
      </div>

      <div class="container">
        
        <p class="history-title" v-if="Object.keys(walletDB.accounts[walletDB.current].confirmingTx).length">{{$t('mine.txHis.confirming')}}</p>
        <div v-if="Object.keys(walletDB.accounts[walletDB.current].confirmingTx).length" class="cell-group">
          <div class="cell-item underline" @click="toHisInfo(walletDB.accounts[walletDB.current].confirmingTx)">
            <img class="cell-logo" :src="walletDB.accounts[walletDB.current].confirmingTx.type ? 'https://lbtc.io/wallet/static/img/wallet-' + walletDB.accounts[walletDB.current].confirmingTx.type + '.png' : 'https://lbtc.io/wallet/static/img/wallet-r.png'">
            <div class="cell-content">
              <div class="title hash">{{walletDB.accounts[walletDB.current].confirmingTx.hash | formatHash}}</div>
              <div class="label" style="word-break:keep-all;">{{walletDB.accounts[walletDB.current].confirmingTx.time | formatTime(1)}}</div>
            </div>
            <div class="cell-function" :class="walletDB.accounts[walletDB.current].confirmingTx.type == 's' ? 'send' : 're' ">
              {{walletDB.accounts[walletDB.current].confirmingTx.type == 's' ? '-' : '+'}}{{walletDB.accounts[walletDB.current].confirmingTx.value}} LBTC
            </div>
          </div>
        </div>

        <p class="history-title">{{$t('mine.txHis.title')}}</p>
        <div class="cell-group">
          <div class="cell-item underline" v-for="(item, index) in walletDB.accounts[walletDB.current].history.slice(0, page * pageCount)" @click="toHisInfo(item)" :key="item.hash + index">
            <img class="cell-logo" :src="item.type ? 'https://lbtc.io/wallet/static/img/wallet-' + item.type + '.png' : 'https://lbtc.io/wallet/static/img/wallet-r.png'">
            <div class="cell-content">
              <div class="title hash">{{item.hash | formatHash}}</div>
              <div class="label" style="word-break:keep-all;">{{item.time | formatTime(1)}}</div>
            </div>
            <div class="cell-function" :class="item.type == 's' ? 'send' : 're' ">
              {{item.type == 's' ? '-' : '+'}}{{item.value}} LBTC
            </div>
          </div>
        </div>
      </div>

    </scroller>

    <div class="buttom-button">
      <div class="buttom-button-item fyellow" @click="toSend">
        <img src="https://lbtc.io/wallet/static/img/coin-send.png" alt="">
          {{$t('wallet.index.tabSend')}}
      </div>
      <div class="buttom-button-middle"></div>
      <div class="buttom-button-item fblue" @click="toReceive">
        <img src="https://lbtc.io/wallet/static/img/coin-receievd.png" alt="">
        {{$t('wallet.index.tabReceive')}}
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      availableBalance: 0,
      unavailableBalance: 0,
      coin: '',
      showTxs: [],
      showMoreBalance: false,
      pageCount: 50,
      page: 1,
      totalPage: 0,
      infiniteStatus: true,
    }
  },
  computed: {
    historyLocation() {
      return this.$store.state.historyLocation
    }
  },
  created(){},
  mounted(){
    this.hisInit();
  },
  methods:{
    isBack() {
      this.$store.commit('setHistoryLocation', {
        left: 0,
        top: 0,
        page: 1
      });
      this.$router.goBack();
    },

    hisInit(){
      this.coin = this.$route.query.coin;
      this.totalPage = Math.ceil(this.walletDB.accounts[this.walletDB.current].history.length / this.pageCount);
      setTimeout( ()=> {
        this.$refs.myscroller.scrollTo(this.historyLocation.left, this.historyLocation.top);
      },100)
    },

    refresh() {
      if (this.walletDB.updataStatus) {
        this.$store.commit('setUpdataStatus', false);
        this.$store.dispatch('getWalletTxs', {
          address: this.walletDB.current
        }).then( data=> {
          this.lbtcWalletDB.insertHistroy(this.walletDB.current, data);
          this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then(r => {
            if (data.currentHistory.length) {
              Toast({
                duration: 2000,
                message: this.$t('mine.txHis.msg2')
              });
            } else {
              Toast({
                duration: 2000,
                message: this.$t('mine.txHis.msg3')
              });
            }
            this.page = 1;
            this.totalPage = Math.ceil(this.walletDB.accounts[this.walletDB.current].history.length / this.pageCount);
            this.$refs.myscroller.finishPullToRefresh();
            this.$store.commit('setUpdataStatus', true);
          })
        }).catch((error) => {
          Toast({
            duration: 2000,
            message: error
          });
          this.$store.commit('setUpdataStatus', true);
          this.$refs.myscroller.finishPullToRefresh();
        })
      } else {
        this.$refs.myscroller.finishPullToRefresh();
      }
    },

    infinite(done) {
      // Trigger
      if (this.page >= this.totalPage) {
        this.$refs.myscroller.finishInfinite(2);
        return
      }
      // Action
      if (this.infiniteStatus) {
        this.infiniteStatus = false;
        window.setTimeout(() => {
          this.page = this.page + 1;
          done()
          this.infiniteStatus = true;
        }, 1500)
      }
    },

    toHisInfo(param) {
      let {left, top} = this.$refs.myscroller.getPosition()
      this.$store.commit('setHistoryLocation', {
        left: left,
        top: top,
        page: this.page
      });
      this.$router.push({ path:'/mine-tx-hisInfo', query: { txInfo: JSON.stringify(param)} });
    },

    moreBalance() {
      if (this.walletDB.accounts[this.walletDB.current].unavailableBalance) {
        this.showMoreBalance = !this.showMoreBalance;
      } else {
        return false
      }
    },

    toSend() {
      this.$router.push({ path: "/wallet-send" });
    },

    toReceive() {
      this.$router.push({ path: "/wallet-receive" });
    },

    onCopy() {
      Toast.success({
        duration: 1500,
        message: this.$t('commom.tx.copied')
      });
    },

    onError() {
      Toast.fail({
        duration: 1500,
        message: this.$t('commom.tx.copyError')
      });
    }

  },
  watch: {
    walletDB: {
      handler(newVal, oldVal) {
        this.availableBalance = newVal.accounts[newVal.current].availableBalance;
        this.unavailableBalance = newVal.accounts[newVal.current].unavailableBalance;
      },
      deep: true,
      immediate: true
    }
  }
}
</script>