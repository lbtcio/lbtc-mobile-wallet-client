<style lang="scss" scoped>
#main-index {
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.03s ease-out;
  }
  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }
  .bounce-transition {
    display: inline-block;
  }
  .bounce-enter {
    animation: bounce-in 0.5s;
  }
  .bounce-leave {
    animation: bounce-out 0.5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
}
</style>
<template>
  <div id="main-index" v-if="showMain">

    <transition name="fade" mode="out-in">
      <component v-bind:is="active == 0 ? 'wallet' : active == 1 ? 'news' : 'mine'"></component>
    </transition>

    <!-- <wallet v-show="active == 0" transition="bounce"></wallet>
    <news v-show="active == 1" transition="bounce"></news>
    <mine v-show="active == 2" transition="bounce"></mine> -->

    <van-tabbar v-model="active">
      <van-tabbar-item>
        <span>{{$t('main.tabName1')}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="active == 0 ? icon.active + '0.png' : icon.normal + '0.png'"
        >
      </van-tabbar-item>
      <van-tabbar-item>
        <span>{{$t('main.tabName2')}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="active == 1 ? icon.active + '1.png' : icon.normal + '1.png'"
        >
      </van-tabbar-item>
      <van-tabbar-item>
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
import wConfig from "../../factory/wallet/config.js";
export default {
  components: {
    Wallet,
    Mine,
    News
  },
  props: {},
  data() {
    return {
      showMain: true,
      active: 0,
      icon: {
        normal: "http://lbtc.io/wallet/static/img/main-",
        active: "http://lbtc.io/wallet/static/img/main-a-"
      },
      vData: {}
    };
  },
  computed: {},
  beforeCreate() {
    
  },
  created() {
    this.active = this.$store.state.mainAction;
  },
  mounted() {

    this.$http.get(this.$api.api.getversion, {
      param: 'getversion'
    }).then( res => {
      this.vData = res;
      if (this.versionCompare(this.vData.version, wConfig.version)) {
        this.openDialog()
      } else {
        return
      }
    })
  },
  methods: {
    openDialog() {
      this.$dialog.confirm({
        title: this.$t('main.updataTitle'),
        message: this.$t('main.updataMessage'),
        confirmButtonText: this.$t('main.confirmButtonText'),
        cancelButtonText: this.$t('main.cancelButtonText')
      }).then(() => {
        // on confirm
        plus.runtime.openURL('https://lbtc.io/m-download.html');
        plus.runtime.quit()
      }).catch(() => {
        if (this.vData.flag == '1') {
          plus.runtime.quit()
        }
      });
    }
  },
  destroyed() {},
  watch: {
    active(newVal, oldVal) {
      this.$store.state.mainAction = newVal;
      this.$store.commit('saveMainAction', {
        mainAction: newVal
      });
    }
  }
};
</script>