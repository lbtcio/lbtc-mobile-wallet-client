<style lang="scss" scoped>
#main-index {
}
</style>
<template>
  <div id="main-index" v-if="walletDB && walletDB.current">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

    <van-tabbar v-model="active">
      <van-tabbar-item to="/main-index/wallet">
        <span>{{$t('main.tabName1')}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="active == 0 ? icon.active + '0.png' : icon.normal + '0.png'"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/main-index/news">
        <span>{{$t('main.tabName2')}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="active == 1 ? icon.active + '1.png' : icon.normal + '1.png'"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/main-index/mine">
        <span>{{$t('main.tabName3')}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="active == 2 ? icon.active + '2.png' : icon.normal + '2.png'"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
import Wallet from "../wallet/index.vue";
import News from "../news/index.vue";
import Mine from "../mine/index.vue";
export default {
  components: {
    Wallet,
    Mine,
    News
  },
  props: {},
  data() {
    return {
      active: 0,
      icon: {
        normal: "https://lbtc.io/wallet/static/img/main-0-",
        active: "https://lbtc.io/wallet/static/img/main-0-a-"
      },
      vData: {}
    };
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.localforage.getItem("walletDB").then(res => {
      if (!res) {
        this.$router.push({ path: "/create-index" });
      }
    });
    this.swithPath(this.$route.path);
  },
  mounted() {
    this.$http
      .get(this.$api.api.getversion, {
        param: "getversion"
      })
      .then(res => {
        this.vData = res;
        if (this.versionCompare(this.vData.version, this.wConfig.version)) {
          this.openDialog();
        } else {
          return;
        }
      });
  },
  methods: {
    openDialog() {
      this.$dialog.confirm({
        title: this.$t("main.updataTitle"),
        message: this.$t("main.updataMessage"),
        confirmButtonText: this.$t("main.confirmButtonText"),
        cancelButtonText: this.$t("main.cancelButtonText")
      })
      .then(() => {
        // on confirm
        plus.runtime.openURL("https://lbtc.io/m-download.html");
        plus.runtime.quit();
      })
      .catch(() => {
        if (this.vData.flag == "1") {
          plus.runtime.quit();
        }
      });
    },

    swithPath(path) {
      switch (path) {
        case "/main-index/wallet":
          this.active = 0;
          break;
        case "/main-index/news":
          this.active = 1;
          break;
        case "/main-index/mine":
          this.active = 2;
          break;
        default:
          break;
      }
    }
  },
  destroyed() {},
  beforeRouteLeave (to, from, next) {
    this.$dialog.close();
    next();
  },
  watch: {
    active(newVal, oldVal) {
      this.$store.state.mainAction = newVal;
      this.$store.commit("saveMainAction", {
        mainAction: newVal
      });
    }
  }
};
</script>