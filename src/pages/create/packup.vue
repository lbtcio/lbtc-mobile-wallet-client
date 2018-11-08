<style lang="scss" scoped>
  #create-packup {
    
  }
</style>
<template>
  <div id="create-packup">
    <van-nav-bar
      :title="$t('create.packup.navTitle')"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="container">
      <div class="input-group">
        <div class="text-center">
          <img class="msg-icon" src="http://lbtc.io/wallet/static/img/safe@2x.png" alt="">
          <h3>{{$t('create.packup.title')}}</h3>
        </div>
        <p>{{$t('create.packup.content')}}</p>
        <button class="default" @click="openPassDialogAction()">{{$t('create.packup.button1')}}</button>
        <p class="text-center">
          <router-link class="f666" to='/main-index'>{{$t('create.packup.button2')}}</router-link>
        </p>
      </div>
    </div>

    <van-dialog
      v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('create.packup.confirmButtonText')" 
      :cancelButtonText="$t('create.packup.cancelButtonText')" 
      :before-close="beforePassDialogClose"
    >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('create.packup.dialogTitle')}}</div class>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw">
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components: {},
  props: {},
  data() {
    return {
      deFalse: false,
      checked: false,
      wallet_list: {},
      wallet_info: {},
      psw: '',
      openPassDialog: false,
      openWarnDialog: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      return false
    },
    openPassDialogAction() {
      this.openPassDialog = true;
    },
    beforePassDialogClose(action, done) {
      if (action === 'confirm') {
        Promise.all([this.localforage.getItem("wallet_list"), this.localforage.getItem("current_wallet")]).then( data => {
          if (data) {
            this.wallet_list = data[0];
            this.wallet_info = data[0][data[1]];
            if (this.wallet_info.psw == this.psw) {
              done();
              this.$router.push({ path: "/create-mnemonic", query: { wallet_info: JSON.stringify(this.wallet_info)} });
            } else {
              Toast.fail({
                duration: 1000,
                message: this.$t('create.packup.msg1')
              });
              this.psw = '';
              done(false);
            }
          } else {
            Toast.fail({
              duration: 1500,
              message: this.$t('create.packup.msg2')
            });
          }
        })
      } else {
        this.psw = '';
        done();
      }
    },
  },
  destroyed() {},
  watch: {}
};
</script>