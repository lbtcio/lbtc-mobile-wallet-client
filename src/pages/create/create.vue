<style lang="scss" scoped>
#create-create {
  .van-popup--right {
    width: 100%;
    height: 100%;
  }
  .term-content {
    height: 100vh;
    overflow-y: auto;
    p {
      font-size: 12px;
      letter-spacing: .5px;
    }
  }
}
</style>
<template>
  <div id="create-create">
    <van-nav-bar :z-index="1000" 
      :title='$t("create.create.navTitle")'
      left-arrow 
      fixed 
      @click-left="$router.goBack()"
    />

    <div class="container fixed-container">
      <form>
        <div class="input-group">
          <div class="input-item">
            <input type="text" id="name" :placeholder="$t('create.create.walletName')" v-model.trim="name.value" @change="nameChange(name)">
            <label for="name" class="error-msg" v-if="name.msg">{{name.msg}}</label>
          </div>
          <div class="input-item">
            <input type="password" id="password" :placeholder="$t('create.create.walletPassword')" v-model.trim="password.value" @change="passChange(password)">
            <label for="password" class="error-msg" v-if="password.msg">{{password.msg}}</label>
          </div>
          <div class="input-item">
            <input type="password" id="repass" :placeholder="$t('create.create.reWalletPassword')" v-model="repass.value" @change="repassChange(repass)">
            <label for="repass" class="error-msg" v-if="repass.msg">{{repass.msg}}</label>
          </div>
          <div class="input-item">
            <van-checkbox v-model="checked.value" @change="checkboxChange(checked)">{{$t('create.create.checkbox1')}}<a href="javascript:;" @click.stop="openTerms = true"> {{$t('create.create.checkbox2')}}</a></van-checkbox>
            <label for="checked" class="error-msg" v-if="checked.msg">{{checked.msg}}</label>
          </div>
        </div>
      </form>

      <div class="input-group">
        <button class="default" @click="createWallet">{{$t('create.create.createWallet')}}</button>
        <p class="f99">
          {{$t('create.create.msg')}}
        </p>
      </div>

    </div>
    
    <van-popup v-model="openTerms" position="right">
      <van-nav-bar :z-index="1000" 
        :title="$t('create.create.termTitle')"
        left-arrow
        fixed 
        @click-left="openTerms = false"
      />
      <div class="container fixed-container term-content" v-html="termContent">
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
      termContent: '',
      wallet_list: {},
      openTerms: false,
      network: {},
      walletInfo: {},
      name: {
        value: "",
        msg: "",
        status: false
      },
      password: {
        value: "",
        msg: "",
        status: false
      },
      repass: {
        value: "",
        msg: "",
        status: false
      },
      checked: {
        value: false,
        msg: "",
        status: false
      }
    };
  },
  computed: {},
  created() {
    this.createInit();
  },
  mounted() {},
  methods: {
    createInit() {
      this.termContent = this.wConfig.terms;
      this.localforage.getItem("wallet_list").then(res => {
        if (res) {
          this.wallet_list = res;
        } else {
          this.wallet_list = {};
        }
      })
    },

    nameChange(e) {
      if (e.value == "") {
        this.name.msg = this.$t('create.create.walletNameMsg');
        this.name.status = false;
      } else {
        this.name.msg = "";
        this.name.status = true;
      }
    },

    passChange(e) {
      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/);
      if (e.value == "") {
        this.password.msg = this.$t('create.create.walletPasswordMsg1');
        this.password.status = false;
      } else if (reg.test(e.value)) {
        this.password.msg = "";
        this.password.status = true;
      } else {
        this.password.msg = this.$t('create.create.walletPasswordMsg2');
        this.password.status = false;
      }
      this.repassChange(this.repass);
    },

    repassChange(e) {
      if (this.password.value == this.repass.value) {
        this.repass.msg = "";
        this.repass.status = true;
      } else {
        this.repass.msg = this.$t('create.create.reWalletPasswordMsg');
        this.repass.status = false;
      }
    },

    checkboxChange(e) {
      if (!e.value) {
        this.checked.msg = this.$t('create.create.checkboxMsg');
        this.checked.status = false;
      } else {
        this.checked.msg = "";
        this.checked.status = true;
      }
    },

    checkWalletListLen() {
      if (this.walletDB.addresses.length > 4) {
        Toast.fail({
          duration: 1500,
          message: this.$t('create.create.sumMsg')
        });
        return false;
      } else {
        return true;
      }
    },

    createWallet() {
      if (!this.checkWalletListLen()) {
        return false;
      }
      this.nameChange(this.name);
      this.passChange(this.password);
      this.repassChange(this.repass);
      this.checkboxChange(this.checked);
      if (
        this.name.status &&
        this.password.status &&
        this.repass.status &&
        this.checked.status
      ) {
        Toast.loading({
          mask: true,
          message: this.$t('create.create.createMsg')
        });
        window.setTimeout( ()=> {

          let mnemonic = this.Wallet.generateMnemonic();
          let walletInfo = this.Wallet.createWalletFromMnemonic(mnemonic);

          this.lbtcWalletDB.insertaccount(
            walletInfo.address,
            walletInfo.avatar,
            this.name.value,
            this.password.value,
            walletInfo.mnemonicWord,
            walletInfo.privateKey,
            walletInfo.network,
            false,
            1
          )

          this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then(r => {
            Toast.clear();
            this.$router.push({ path: "/create-packup", query: {addr: walletInfo.address} });
          })

        }, 200);
      }
    }
  }
};
</script>