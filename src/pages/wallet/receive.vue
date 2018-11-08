<style lang="scss" scoped>
#wallet-receive{
  .container {
    color: #666;
    padding-top: 60px;
    padding-left: 60px;
    padding-right: 60px;
  }
  .addr-title {
    margin-top: 40px;
    font-size: 15px;
    font-weight: 600;
  }
  .addr-addr {
    margin-top: 20px;
    font-size: 14px;
    word-break: break-word;
  }
  .addr-qr {
    text-align: center;
  }
  .addr-botton {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #f6b330;
    color: #fff;
  }
  .input-group {
    padding-left: 0;
    padding-right: 0;
}
}
</style>
<template>
  <div id="wallet-receive">
    <van-nav-bar
      :title="$t('wallet.receive.navTitle')"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container">
      <div class="addr-qr">
        <qrcode-vue :value="address" size="240" level="H" class="qrcode"></qrcode-vue>
      </div>
      <div class="addr-title">{{$t('wallet.receive.title')}}:</div>
      <div class="addr-addr">{{address}}</div>

      <div class="input-group">
        <button class="yellow" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('wallet.receive.copyToClipboard')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { Toast } from 'vant';

export default {
  components:{
    QrcodeVue
  },
  props:{},
  data(){
    return {
      address: ''
    }
  },
  computed:{},
  created(){
    this.localforage.getItem("current_wallet").then( addr => {
      this.address = addr;
    })
  },
  mounted(){},
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      return
    },
    onCopy(e) {
      Toast.success({
        duration: 1500,
        message: this.$t('wallet.receive.msg1')
      });
    },
    onError(e) {
      Toast.fail({
        duration: 1500,
        message: this.$t('wallet.receive.msg2')
      });
    }
  },
  destroyed(){},
  watch:{},
}
</script>