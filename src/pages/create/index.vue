<style lang="scss" scoped>
#create-index {
  .container {
    height: 100vh;
    text-align: center;
    .logo {
      margin-top: 15vh;
      width: 180px;
      height: 180px;
    }
    .changeLang {
      text-align: right;
      color: #1d5aa3;
      a {
        color: #1d5aa3;
      }
    }
    .title {
      font-size: 20px;
      letter-spacing: 0px;
    }
    .input-group {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10vh;
    }
  }
}
</style>
<template>
  <div id="create-index" v-if="showCreate">
    <div class="container">
      <p class="changeLang">
        <a @click="changeLang('zh')">中文</a>
        |
        <a @click="changeLang('en')">EN</a>
      </p>
      <img class="logo" src="http://lbtc.io/wallet/static/img/logo.png" alt="">
      <p class="title">Make Transfers Fast as Lightning</p>
      <div class="input-group">
        <button class="yellow" @click="toCreateCreate">{{$t("create.index.createWallet")}}</button>
        <button class="default" @click="toInportIndex">{{$t("create.index.importWallet")}}</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showCreate: true
    };
  },
  computed: {},
  created() {
    
  },
  mounted() {},
  methods: {
    toCreateCreate() {
      this.$router.push({ path: '/create-create'});
    },
    toInportIndex() {
      this.$router.push({ path: '/import-index'});
    },
    changeBg() {
      if (this.$store.state.isplusReady) {
        plus.navigator.setStatusBarBackground("#FFFFFF");
      }
    },
    changeLang(e) {
      let locale = this.$i18n.locale;
      if (locale != e) {
        this.$i18n.locale = e;
        localStorage.setItem('locale', e);
      }
    }
  },
  destroyed() {
    if (this.$store.state.isplusReady) {
      plus.navigator.setStatusBarBackground("#f6b330");
    }
  },
  watch: {}
};
</script>