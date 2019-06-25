<style lang="scss" scoped>
#wallet-index {
  .wallet-header {
    color: #fff;
    height: 230px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: linear-gradient(135deg, #1c59a2 0, rgba(28,89,162, 0.9) 25%, #3271b3 25%, #317dc0 50%,#3985c6 50%, rgba(54,146,212, 0.95) 75%, #499bd7 75%, #3ca2e2);
    .top-button {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .wap-nav {
        position: relative;
        bottom: -1px;
        height: 2px;
        width: 10px;
        margin-right: 5px;
        background-color: #fff;
        border-radius: 1px;
        &::after {
          content: '';
          position: absolute;
          height: 2px;
          width: 80%;
          background-color: #fff;
          top: -4px;
          left: 0;
          border-radius: 1px;
        }
        &::before {
          content: '';
          position: absolute;
          height: 2px;
          width: 120%;
          background-color: #fff;
          bottom: -4px;
          left: 0;
          border-radius: 1px;
        }
      }
      .name {
        font-size: 14px;
      }
      .flex-space {
        flex: 1;
      }
      img {
        width: 20px;
        height: 20px;
      }
      .avatar {

      }
      .qr-code {
        margin-left: 10px;
      }
    }
    .middle-balance {
      padding: 24px 0;
      .title {
        font-size: 16px;
        margin-bottom: 16px;
      }
      .balance {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .bottom-entrance {
      display: flex;
      padding: 10px 0;
      .bottom-entrance-item {
        flex: 1;
        font-size: 14px;
        img {
          height: 24px;
          width: auto;
        }
      }
    }
  }
  .backup {
    font-size: 12px;
    padding: 2px 4px;
    background-color: #e64545;
    color: #fff;
    border-radius: 3px;
  }
  .wallet-index-fixed {
    height: calc(100vh - 230px);
    margin-top: 230px;
    padding-bottom: 50px;
    z-index: 0;
    background-color: #fff;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .my-coin {
    height: calc(100vh - 300px);
    color: #1d5aa3;
    a {
      color: #1d5aa3;
    }
    .label {
      font-size: 12px;
      color: #999;
    }
    .top-title {
      padding: 6px 0;
      .add-coin {
        font-size: 20px;
        float: right;
      }
    }
  }
  .van-popup--left {
    height: 100vh;
    width: 60vw;
    .wallet-list-title {
      padding: 15px 18px;
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
      padding: 10px 18px;
      align-items: center;
      color: #666;
      .wallet-photo {
        flex: 0;
        height: 30px;
        margin-right: 5px;
        vertical-align: middle;
      }
      .wallet-name {
        flex: 1;
        font-size: 14px;
        .wallet-address {
          font-size: 12px;
          color: #999;
        }
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
}
</style>
<template>
  <div id="wallet-index" v-if="walletDB && walletDB.current">
    <div class="wallet-header">
      <div class="container">
        <div class="top-button">
          <span class="wap-nav" @click="showWalletList = true"></span>
          <span class="name" @click="showWalletList = true">{{walletDB.accounts[walletDB.current].name}}</span>
          <span class="flex-space"></span>
          <img class="avatar" @click="toWalletInfo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACHUlEQVRYR9WX0VEcMRBEuyOADAwRYCIwRACOwL4IfERgiAAcgSECcATmIvA5AhMCF0G7mpKuFrHLSNoPClXt165mnmZmZ1pE55L0EcBO2r4hue4xxdZNkpYAvgHYK/Y+ALgi+aPFZjWApF0AvwH45K8tR+KY5GMNSBVAg/PssxqiFuAawJeaEw2+uSH5NdoTAkhyrv9Fhibe75N0bUyuGgAX3WUnwBnJq7kA9wA+dQL8Inn6lgArkkfvHuAcwPfOFFyQ9P5ZRejG86cT4DBq0eFfYMeSegoxzL9t1wK4F7i75eETBWTjlh31gGqAFAWnwpGIIOz8KAp9PkFVBPLHaSa4sUy15RsAy9pB1BSBYcwTiCOS/3FHZt3iuCsCUeJ73jelYJAKn/zDQJR44DyQXLVCVANI8mg9AfBqbwdw54ek6yFcIYAkO/Q0LCVYZNxR8TQ0UF8nlOSKt/6bs6wTz6YMTEZAUo8KmvJzTXIx9nIUoML5XwAWnVl4WrA6RS7MJogXACnntyNWXOGOigtsVPGm/uCaccGOiZjPZU08A0gGPPmGBWfH5yTdbKqXJP+qrqGDwSYXpifk9gAlQKn/wnkeEUkq9cQznVgCeOJl4gVJh3z2Sj3kZzLkln2YjW4BCvkdqtlWqiISW7k+BHDOfPUKlWyr8/y9JDcld1Nf3Z5qagiQcxVeJmYA5EvOtrbKFOzWCokZEB7jj1kt/QcfytMhQ6pwOgAAAABJRU5ErkJggg==">
          <img class="qr-code" v-if="isplusReady" @click="toQrCode" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABb0lEQVRYR+1X0U3DMBS8mwCYAJgANgAmgA2ACWCEsgFMQLsBTEC7QbpB2aCZ4NAFG1kRpU6dKnzEUhWlfe/5fD3b7wgAkm4APAC49HsyXkg+tr7r9CrpOdRO8+YAnkjOKcmTfmyoWpM87DRjK1jSGsDBhhpXBmA0FyFgCcAJHn5OSb4VAjC7dwDiQvw8CzUXBhARfpI8KZksN1fSCsCxF2kA+kFDtjWQW7NTXMr6vwAQ6ShWfC4Nkqyra8ebgfOw/Sy4KMDcWjvFhW0/bUS+U4Uek0YAIwPDMyApPZt71HdWqaXPgXgQZWX0HFQZQJXcTj3X31quYcB/gU/DIUY1vAiHWHY658jAyIC3ofv2WwD3pR1wrqBDQ/IKYJb2hO8k3ULvfbRbsrErjsZkRfJ07/x/e9F4AdZta+Yf/PEwsFmpMIPgLPJozey+ogNrrNlf5nRN8qiEla3m1MUDiEm4FVMnW2xWfrHnNQC3ABPb8y9RDLGjNd2FUwAAAABJRU5ErkJggg==">
        </div>
        <div class="middle-balance text-center">
          <div class="title">
            {{$t('wallet.index.myAssets')}}(LBTC)
            <span v-if="!walletDB.accounts[walletDB.current].backupFlag" class="backup" @click="toWalletInfo">{{$t('wallet.index.backup')}}</span>
          </div>
          <div class="balance" @click="toSend">{{availableBalance}}</div>
        </div>
        <div class="bottom-entrance">
          <div class="bottom-entrance-item text-center" @click="toSend">
            <img src="https://lbtc.io/wallet/static/img/main-send-0.png">
            <div>{{$t('wallet.index.tabSend')}}</div>
          </div>
          <div class="bottom-entrance-item text-center" @click="toReceive">
            <img src="https://lbtc.io/wallet/static/img/main-received-0.png">
            <div>{{$t('wallet.index.tabReceive')}}</div>
          </div>
          <div class="bottom-entrance-item text-center" @click="toVote">
            <img src="https://lbtc.io/wallet/static/img/main-node-0.png">
            <div>{{$t('wallet.index.tabNode')}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="wallet-index-fixed">
      <mt-loadmore
        style="overflow: visible;"
        :top-method="refresh"
        :auto-fill="false"
        :topPullText="$t('main.refresh')"
        :topDropText="$t('main.refresh')"
        :topLoadingText="$t('main.loading')"
        ref="loadmore">
        <div class="my-coin container">
          <div class="top-title">
            <span>{{$t('wallet.index.assets')}}</span>
          </div>
          <div class="cell-group">
            <router-link :to="{path: '/wallet-coin-history', query: { coin: 'LBTC'}}">
              <div class="cell-item underline">
                <img class="cell-logo" src="https://lbtc.io/wallet/static/img/coin-lbtc.png">
                <div class="cell-content">
                  <div class="title">LBTC</div>
                  <div class="label">Lightning Bitcoin</div>
                </div>
                <div class="cell-function">{{availableBalance}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
    </div>

    <!-- Wallet List -->
    <van-popup v-model="showWalletList" position="left">
      <div class="wallet-list-title">{{$t('wallet.index.walletListTitle')}}</div>
      <div class="container">
        <div class="wallet-list-item" :class="item == walletDB.current ? 'action' : ''" v-for="(item, index) in walletDB.addresses" :key="item" @click="selectWallet(item)">
          <img class="wallet-photo" :src="'https://lbtc.io/wallet/static/img/photo/0/' + walletDB.accounts[item].avatar + '.png'">
          <div class="wallet-name ellipsis">
            <div>{{walletDB.accounts[item].name}}</div>
            <div class="wallet-address hash">{{walletDB.accounts[item].address | formatHash}}</div>
          </div>
        </div>
      </div>

      <div class="bottom-button">
        <div class="wallet-list-item" @click="toImport">
          <img class="wallet-photo" style="height: 24px;" :src="'https://lbtc.io/wallet/static/img/wallet-index-inport.png'">
          <div class="wallet-name ellipsis">{{$t('create.index.importWallet')}}</div>
        </div>
        <div class="wallet-list-item" @click="toCreate">
          <img class="wallet-photo" style="height: 24px;" :src="'https://lbtc.io/wallet/static/img/wallet-index-create.png'">
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
      showWalletList: false,
      availableBalance: 0
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.walletIndexInit();
  },
  methods: {
    walletIndexInit() {
      if (this.$store.state.isFreshWallet) {
        this.$store.commit('isFreshWallet', false);
        window.setTimeout(() => {
          this.refresh();
        }, 500)
      }
    },

    refresh() {
      if (this.walletDB.updataStatus) {
        // await this.$store.dispatch('checkSync',this.walletDB.current)
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
            this.$store.commit('setUpdataStatus', true);
            this.$refs.loadmore.onTopLoaded();
          })
        }).catch((error) => {
          Toast({
            duration: 2000,
            message: error
          });
          this.$store.commit('setUpdataStatus', true);
          this.$refs.loadmore.onTopLoaded();
        })
      } else {
        this.$refs.loadmore.onTopLoaded();
      }
    },

    selectWallet(param) {
      if (param != this.walletDB.current && this.walletDB.updataStatus) {
        this.lbtcWalletDB.selectWallet(param);
        this.showWalletList = false;
        this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then( r => {
          this.refresh();
        });
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

    toGovernance() {
      this.$router.push({ path: "/governance-index" });
    },

    toRegister() {
      this.$router.push({ path: "/register-index" });
    },

    toToken() {
      this.$router.push({ path: "/token-index" });
    },

    toCreate() {
      this.$router.push({ path: "/create-create" });
    },

    toImport() {
      this.$router.push({ path: "/import-index" });
    },

    toHisInfo(param) {
      this.$router.push({
        path: "/mine-tx-hisInfo",
        query: { txInfo: JSON.stringify(param) }
      });
    },

    toWalletInfo() {
      this.$router.push({
        path: "/mine-manageInfo",
        query: { addr: this.lbtcWalletDB.current }
      });
    },

    toAddCoin() {
      this.$router.push({ path: "/wallet-add" });
    },

    toQrCode() {
      this.$router.push({ path: "/qr" });
    },
  },
  watch: {
    walletDB: {
      handler(newVal, oldVal) {
        this.availableBalance = newVal.accounts[newVal.current].availableBalance;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>