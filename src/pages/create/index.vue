<style lang="scss" scoped>
#create-index {
  .container {
    text-align: center;
    position: inherit;
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
      .net {
        float: left;
        color: #666;
        letter-spacing: 0;
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
        <span class="net">{{wConfig.network == 'bitcoin' ? 'Mainnet' : 'Testnet'}}</span>
        <a @click="changeLang('zh')">中文</a>
        |
        <a @click="changeLang('en')">EN</a>
      </p>
      <img class="logo" src="https://lbtc.io/wallet/static/img/logo.png" alt>
      <p class="title">Make Transfers Fast as Lightning</p>
      <div class="input-group">
        <button class="yellow" @click="toInportIndex">{{$t("create.index.importWallet")}}</button>
        <button class="default" @click="toCreateCreate">{{$t("create.index.createWallet")}}</button>
      </div>
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
      showCreate: true
    };
  },
  computed: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.localforage.getItem("wallet_list").then(l => {
        if (l) {
          Toast.loading({
            duration: 0,
            message: this.$t("commom.tx.merginWallet")
          });
          Object.keys(l).map(key => {
            this.lbtcWalletDB.insertaccount(
              key,
              l[key].photo,
              l[key].name,
              l[key].psw,
              l[key].mnemonic,
              l[key].prv,
              l[key].network,
              l[key].ispackup,
              1
            );
            this.localforage.removeItem('news_lbtcnews')
            this.localforage.removeItem(key + "+confirmingTx");
            this.localforage.removeItem(key + "+ownToken");
            this.localforage.removeItem(key + "+txsDetails");
            this.localforage.removeItem(key + "+unspent");
          });

          this.$store.dispatch("saveWalletDB", this.lbtcWalletDB).then(r => {
            Toast.clear();
            localStorage.setItem("isMerge", true);
            this.$router.push({ path: "/main-index/wallet" });
          });
        }
      });
    }, 200)
  },
  methods: {
    toCreateCreate() {
      this.$router.push({ path: "/create-create" });
    },
    toInportIndex() {
      this.$router.push({ path: "/import-index" });
    },
    changeLang(e) {
      let locale = this.$i18n.locale;
      if (locale != e) {
        this.$i18n.locale = e;
        localStorage.setItem("locale", e);
      }
    }
  }
};
</script>