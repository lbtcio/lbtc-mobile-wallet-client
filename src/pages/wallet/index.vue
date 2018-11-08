<style lang="scss" scoped>
#wallet-index {
  .photo {
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 10px;
    right: 0;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wallet-header {
    // margin-top: 52px;
    box-shadow: 0px 2px 2px 0px rgba(29, 90, 163, 0.2);
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
  .van-popup--left {
    height: 100vh;
    width: 60vw;
    .wallet-list-title {
      padding: 15px 30px;
      font-weight: 600;
      font-size: 18px;
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      background-color: #fff;
      z-index: 2000;
    }
    .container {
      padding: 50px 0 130px 0;
      height: 100%;
      overflow-y: auto;
    }
    .wallet-list-item {
      display: flex;
      padding: 6px 30px;
      align-items: center;
      color: #666;
      .wallet-photo {
        flex: 0;
        height: 30px;
        margin-right: 10px;
      }
      .wallet-name {
        flex: 1;
        font-size: 14px;
      }
    }
    .action {
      background-color: #eee;
    }
    .bottom-button {
      position: absolute;
      background-color: #fff;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px 0;
      border-top: 1px solid #eee;
      z-index: 2000;
    }
  }
  .nodata {
    height: 100px;
    display: block;
    margin: 30px auto 10px;
  }
  
}
</style>
<template>
  <div id="wallet-index" @click="showMoreBalance = false">
    <van-nav-bar :title="wallet_info.name" left-text="" fixed @click-left="showWalletList = true" @click-right="toWalletInfo">
      <van-icon name="wap-nav" slot="left" />
      <van-icon name="contact" slot="right" />
    </van-nav-bar>

    <scroller class="fixed-container" :on-refresh="refresh" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">

      <div class="wallet-header">
        <div class="header-top text-center">
          <img @click="toReceive" class="header-logo" src="http://lbtc.io/wallet/static/img/logo.png">
          <div class="header-balance" :class="showMoreBalance ? 'show-more-balance' : ''">
            <span @click.stop="moreBalance" class="balance">
              {{ UnSpent ? UnSpent.totalbalance : 0}}
            </span>
            <span @click.stop="moreBalance" class="sign">LBTC</span><span class="note" v-if="!wallet_info.ispackup" @click="toWalletInfo">{{$t('wallet.index.backup')}}</span>
            <span @click.stop="moreBalance" class="more" v-if="UnSpent.unavailablebalance">
              <van-icon name="arrow" />
            </span>
            <div class="more-balance-content" v-if="showMoreBalance">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>{{$t('wallet.index.availablebalance')}}:</td>
                  <td><span>{{UnSpent.availablebalance}} </span><span class="sign">LBTC</span></td>
                </tr>
                <tr>
                  <td>{{$t('wallet.index.unavailablebalance')}}:</td>
                  <td><span>{{UnSpent.unavailablebalance}} </span><span class="sign">LBTC</span></td>
                </tr>
              </table>
            </div>
            
          </div>
        </div>
        <div class="header-bottom">
          <div class="header-bottom-item text-center" @click="toSend">
            <img src="http://lbtc.io/wallet/static/img/wallet-s.png">
            <div>
              {{$t('wallet.index.tabName1')}}
            </div>
          </div>
          <div class="header-bottom-item text-center" @click="toReceive">
            <img src="http://lbtc.io/wallet/static/img/wallet-r.png">
            <div>
              {{$t('wallet.index.tabName2')}}
            </div>
          </div>
          <div class="header-bottom-item text-center" @click="toVote">
            <img src="http://lbtc.io/wallet/static/img/wallet-v.png">
            <div>
              {{$t('wallet.index.tabName3')}}
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <p>{{$t('mine.txHis.title')}}</p>
        <div class="text-center f666" v-if="nodata">
          <img class="nodata" src="http://lbtc.io/wallet/static/img/nodata.png" v-if="nodata">
          {{$t('mine.txHis.msg1')}}
        </div>
        <div class="" v-if="!nodata">

          <div class="tx-item" v-for="(item, index) in txsDetails.txsList" v-if="index < 10" @click="toHisInfo(item)">
            <div class="tx-type">
              <img :src="'http://lbtc.io/wallet/static/img/wallet-' + item.type + '.png'">
            </div>
            <div class="tx-info">
              <div class="tx-id ellipsis">{{item.hash | formatHash}}</div>
              <div class="tx-time" style="word-break:keep-all;">{{item.time | formatTime(1)}}</div>
            </div>
            <div class="tx-value" :class="item.type == 's' ? 'send' : 're' ">
              {{item.type == 's' ? '-' : '+'}}{{item.value}} LBTC
            </div>
          </div>
          <p class="text-center" style="letter-spacing: 0px;" v-if="showMore">
            {{$t('wallet.index.moreHisContent')}}
            <a href="#/mine-tx-his">{{$t('wallet.index.moreHisButton')}}</a>
            ...
          </p>

        </div>
      </div>

    </scroller>

    <van-popup v-model="showWalletList" position="left">
      <div class="wallet-list-title">{{$t('wallet.index.walletListTitle')}}</div>
      <div class="container">
        <div class="wallet-list-item" :class="key == current_wallet ? 'action' : ''" v-for="(value, key, index) in wallet_list" :key="key" @click="selectWallet(key)">
          <img class="wallet-photo" :src="'http://lbtc.io/wallet/static/img/photo/0/' + value.photo + '.png'">
          <div class="wallet-name ellipsis">{{value.name}}</div>
        </div>
      </div>

      <div class="bottom-button">
        <div class="wallet-list-item" @click="toImport">
          <img class="wallet-photo" :src="'http://lbtc.io/wallet/static/img/mine-wallet-man.png'">
          <div class="wallet-name ellipsis">{{$t('create.index.importWallet')}}</div>
        </div>
        <div class="wallet-list-item" @click="toCreate">
          <img class="wallet-photo" :src="'http://lbtc.io/wallet/static/img/mine-wallet-man.png'">
          <div class="wallet-name ellipsis">{{$t('create.index.createWallet')}}</div>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      isLoading: false,
      showWalletList: false,
      wallet_list: {},
      current_wallet: "",
      wallet_info: {},
      txsDetails: {},
      UnSpent: {},
      moreStatus: false,
      balance: 0,
      showMoreBalance: false,
      nodata: false,
      showMore: false,
      walletPopup: false,
    }
  },
  computed: {
    save_wallet_list() {
      return this.$store.state.home.save_wallet_list;
    },
    save_current_wallet() {
      return this.$store.state.home.save_current_wallet;
    },
    save_wallet_info() {
      return this.$store.state.home.save_wallet_info;
    },
    save_txsDetails() {
      return this.$store.state.home.save_txsDetails;
    },
    save_UnSpent() {
      return this.$store.state.home.save_UnSpent;
    },
    save_moreStatus() {
      return this.$store.state.home.save_moreStatus;
    },
    save_nodata() {
      return this.$store.state.home.save_nodata;
    },
    isFreshInHome() {
      return this.$store.state.isFreshInHome
    }
  },
  created() {
    this.walletIndexInit();
  },
  mounted() {
    if (this.isFreshInHome) {
      window.setTimeout( () => {
        this.$refs.myscroller.triggerPullToRefresh();
        this.$store.commit('isFreshInHome', {
          isFreshInHome: false,
        });
      }, 500);
    }
  },
  methods: {
    walletIndexInit() {
      
      if (this.save_current_wallet && JSON.stringify(this.save_UnSpent) != '{}') {

        this.wallet_list = this.save_wallet_list;
        this.current_wallet = this.save_current_wallet;
        this.wallet_info = this.save_wallet_info;
        this.txsDetails = this.save_txsDetails;
        this.UnSpent = this.save_UnSpent;
        this.showMore = this.save_moreStatus;
        this.nodata = this.save_nodata;

      }
      
      Promise.all([this.localforage.getItem("wallet_list"), this.localforage.getItem("current_wallet")]).then( data => {
        
        if (data[0]) {
          this.wallet_list = data[0];
          this.current_wallet = data[1];
          this.wallet_info = data[0][data[1]];

          return Promise.resolve(this.wallet_info)
        } else {
          this.$router.push({ path: "/create-index" });
          return false
        }
      }).then( info => {
        Promise.all([this.localforage.getItem(info.addr + '+txsDetails'), this.localforage.getItem(info.addr + '+unspent')]).then( obj => {
          
          if (obj[0] && obj[1]) {
            if (obj[0].txsList.length) {
              this.nodata = false;
              this.txsDetails = obj[0];
              this.UnSpent = obj[1];
              if (obj[0].txsList.length > 10) {
                this.showMore = true;
              } else {
                this.showMore = false;
              }
            } else {
              this.nodata = true;
              this.showMore = false;
              this.txsDetails = {
                current_height : 1,
                txsList : []
              };
              this.UnSpent = obj[1];
            }
            this.$store.commit('saveHomeState', {
              save_wallet_list: this.wallet_list,
              save_current_wallet: this.current_wallet,
              save_wallet_info: this.wallet_info,
              save_txsDetails: this.txsDetails,
              save_UnSpent: this.UnSpent,
              save_moreStatus: this.showMore,
              save_nodata: this.nodata
            });
          } else {
            this.txsDetails = {
              current_height: 0,
              txsList: []
            };
            this.UnSpent = {
              available: [],
              availablebalance: 0,
              unavailable: [],
              unavailablebalance: 0
            };
            this.nodata = true;
            this.moreStatus = false;
          }
        })
      })
    },

    refresh(done) {
      setTimeout(() => {
        this.getTxByAdd(this.current_wallet, done);
      }, 500);
    },

    getTxByAdd(addr, done) {
      this.$http.get(this.$api.api.getHeight, { addr: addr }).then(res => {
        if (res.error) {
          return Promise.reject(res.msg);
        } else {
          return Promise.resolve(res.msg);
        }
      })
      .then(height => {
        let total_height = height;
        let current_height = this.txsDetails.current_height;
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
          this.getTxsDetails(tx_list, total_height, addr, done);
        });
      })
      .catch(err => {
        Toast({
          duration: 1500,
          message: err
        })
      });
    },

    getTxsDetails(tx_list, total_height, current_wallet, done) {
      let newUnSpent = {};

      if (tx_list.length) {
        let txGroup = this.chunkArry(tx_list, 50);

        this.Wallet.queue(txGroup, current_wallet).then( txsList => {
          return Promise.resolve(txsList)
        }).then( txsList => {
          newUnSpent = this.Wallet.addListUnSpent(txsList, current_wallet, total_height, this.UnSpent);
          this.txsDetails.current_height = total_height;
          this.txsDetails.txsList = txsList.concat(this.txsDetails.txsList);
          if (this.txsDetails.txsList.length) {
            this.nodata = false;
            if (this.txsDetails.txsList.length > 10) {
              this.showMore = true;
            } else {
              this.showMore = false;
            }
          }
          this.UnSpent = newUnSpent;
          return Promise.resolve(
            Promise.all([
              this.localforage.setItem(current_wallet + "+unspent", this.UnSpent),
              this.localforage.setItem(current_wallet + "+txsDetails", this.txsDetails)
            ]).then( res => {
              return Promise.resolve(res)
            })
          )
        }).then(res => {
          Toast({
            duration: 1500,
            message: this.$t('mine.txHis.msg2')
          });
          this.$store.commit('saveHomeState', {
            save_wallet_list: this.wallet_list,
            save_current_wallet: this.current_wallet,
            save_wallet_info: this.wallet_info,
            save_txsDetails: this.txsDetails,
            save_UnSpent: this.UnSpent,
            save_moreStatus: this.showMore
          });
          done()
          return true;
        })

      } else {
        this.txsDetails.current_height = total_height;
        Promise.all([
          this.localforage.setItem(current_wallet + "+txsDetails", this.txsDetails)
        ]).then( res => {
          Toast({
            duration: 1500,
            message: this.$t('mine.txHis.msg3')
          })
          done()
          return true;
        })
      }

    },
       
    selectWallet(param) {
      if (param != this.current_wallet) {
        this.showWalletList = false;
        this.current_wallet = param;

        window.setTimeout( ()=> {
          this.localforage.setItem("current_wallet", param).then( res => {
            if (res) {

              Promise.all([this.localforage.getItem("wallet_list"), this.localforage.getItem("current_wallet")]).then( data => {
                if (data[0]) {
                  this.wallet_list = data[0];
                  this.current_wallet = data[1];
                  this.wallet_info = data[0][data[1]];

                  return Promise.resolve(this.wallet_info)
                } else {
                  this.$router.push({ path: "/create-index" });
                  return false
                }
              }).then( info => {
                Promise.all([this.localforage.getItem(info.addr + '+txsDetails'), this.localforage.getItem(info.addr + '+unspent')]).then( obj => {
                  if (obj[0] && obj[1]) {
                    if (obj[0].txsList.length) {
                      this.nodata = false;
                      this.txsDetails = obj[0];
                      this.UnSpent = obj[1];
                      
                      if (obj[0].txsList.length > 10) {
                        this.showMore = true;
                      } else {
                        this.showMore = false;
                      }
                    } else {
                      this.nodata = true;
                      this.txsDetails = {
                        current_height : 1,
                        txsList : []
                      };
                      this.UnSpent = obj[1];
                    }

                    this.$store.commit('saveHomeState', {
                      save_wallet_list: this.wallet_list,
                      save_current_wallet: this.current_wallet,
                      save_wallet_info: this.wallet_info,
                      save_txsDetails: this.txsDetails,
                      save_UnSpent: this.UnSpent,
                      save_moreStatus: this.showMore,
                      save_nodata: this.nodata
                    });

                  } else {
                    this.txsDetails = {
                      current_height: 0,
                      txsList: []
                    };
                    this.UnSpent = {
                      available: [],
                      availablebalance: 0,
                      unavailable: [],
                      unavailablebalance: 0
                    };
                    this.$store.commit('saveHomeState', {
                      save_wallet_list: this.wallet_list,
                      save_current_wallet: this.current_wallet,
                      save_wallet_info: this.wallet_info,
                      save_txsDetails: this.txsDetails,
                      save_UnSpent: this.UnSpent,
                      save_moreStatus: false,
                      save_nodata: true
                    });
                  }
                })
              })
            }
          });
        }, 500)

        this.$refs.myscroller.triggerPullToRefresh();

      }
    },

    toSend() {
      this.$router.push({ path: "/wallet-send" });
    },

    toReceive() {
      this.$router.push({ path: "/wallet-receive" });
    },

    toVote() {
      this.$router.push({ path: "/vote-index" });
    },

    toCreate() {
      this.$router.push({ path: "/create-create" });
    },

    toImport() {
      this.$router.push({ path: "/import-index" });
    },

    toHisInfo(param) {
      this.$router.push({ path:'/mine-tx-hisInfo', query: { txInfo: JSON.stringify(param)} });
    },

    toWalletInfo() {
      this.$router.push({ path:'/mine-manageInfo', query: { addr: this.current_wallet } });
    },

    showMSG() {
        if (this.txsDetails.txsList && (this.txsDetails.txsList.length > 10)) {
          return true
        } else {
          return false
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
  destroyed() {},
  watch: {
    '$route': function (to, from) {

    }
  }
};
</script>