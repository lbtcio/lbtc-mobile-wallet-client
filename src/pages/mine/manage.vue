<style lang="scss" scoped>
#mine-manage {
  height: 100vh;
  .content {
    padding-top: 8px;
  }
  .wallet-item {
    margin: 8px 1px;
    padding: 0 15px;
    font-size: 14px;
    box-shadow: 0px 0px 3px 1px rgba(29, 90, 163, 0.2);
    color: #333;
    .wallet-item-top {
      display: flex;
      padding: 15px 0 10px;
      border-bottom: 1px solid #eee;
      .wallet-photo {
        margin-right: 10px;
        height: 48px;
        width: 48px;
        img {
          height: 100%;
        }
      }
      .wallet-content {
        max-width: 80%;
        flex: 1;
      }
      .wallet-name {
        // word-break: break-all;
        width: 100%;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .wallet-addr {
        word-break: break-all;
        color: #999;
        // width: 60%;
      }
    }
    .wallet-item-bottom {
      text-align: right;
      padding: 6px 0;
    }
  }
  .buttom-button {
    position: fixed;
    bottom: -1px;
    left: 0;
    right: 0;
    display: flex;
    & > div {
      flex: 1;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
  }
}
</style>
<template>
  <div id="mine-manage">
    <van-nav-bar :title="$t('mine.manage.navTitle')" fixed left-arrow @click-left="onClickLeft" />

    <scroller class="container fixed-container" :on-refresh="refresh" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">

      <div class="content">
        <div class="wallet-item" v-for="(value, key, index) in wallet_list" :v-for="key" @click="toManageInfo(key)">
          <div class="wallet-item-top">
            <div class="wallet-photo">
              <img :src="'http://lbtc.io/wallet/static/img/photo/1/' + value.photo + '.png'" alt="">
            </div>
            <div class="wallet-content">
              <div class="wallet-name">{{value.name}}</div>
              <div class="wallet-addr">{{key}}</div>
            </div>
          </div>
          <div class="wallet-item-bottom"> </div>
        </div>
      </div>

    </scroller>

    <div class="buttom-button">
      <div class="buttom-button-right yellow-color" @click="toCreate">{{$t('create.index.createWallet')}}</div>
      <div class="buttom-button-left default-color" @click="toImport">{{$t('create.index.importWallet')}}</div>
    </div>

  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      allLoaded: true,
      wallet_list: {}
    };
  },
  computed: {},
  created() {
    this.hisInit();
  },
  mounted() {},
  methods: {
    hisInit() {
      setTimeout(() => {
        Toast.clear();
      }, 500)
      this.localforage.getItem("wallet_list").then(list => {
        if (list) {
          this.wallet_list = list;
        }
      });
    },
    
    onClickLeft() {
      this.$router.push({ path: '/main-index'})
    },

    toManageInfo(key) {
      this.$router.push({ path: "/mine-manageInfo", query: { addr: key } });
    },

    toCreate() {
      this.$router.push({ path: "/create-create" });
    },

    toImport() {
      this.$router.push({ path: "/import-index" });
    },

    infinite(done) {
      setTimeout(() => {
        if (this.num < this.items.length) {
          this.num = this.num + 10;
          done();
        } else {
          this.$refs.myscroller.finishInfinite(true);
        }
      }, 1000);
    },
    
    refresh(done) {
      this.hisInit();
      setTimeout(() => {
        done();
      }, 1000);
    }
  },
  destroyed() {},
  watch: {}
};
</script>