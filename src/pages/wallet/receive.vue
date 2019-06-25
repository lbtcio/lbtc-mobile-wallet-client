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
  .qr-hide {
    opacity: 0;
    transition: all 0.2s;
  }
  .qr-show {
    opacity: 1; 
  }
}
</style>
<template>
  <div id="wallet-receive">
    <van-nav-bar :z-index="1000" 
      :title="$t('wallet.receive.navTitle')"
      left-arrow
      @click-left="$router.goBack()"
    />
    <div class="container">
      <div class="addr-qr qr-hide" :class="walletDB.current ? 'qr-show': ''">
        <qrcode-vue :value="walletDB.current" size="200" level="H" v-if="walletDB.current"></qrcode-vue>
      </div>
      <div class="addr-title">{{$t('wallet.receive.title')}}:</div>
      <div class="addr-addr">{{walletDB.current}}</div>

      <div class="input-group">
        <button class="yellow" v-clipboard:copy="walletDB.current" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('wallet.receive.copyToClipboard')}}</button>
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
    return {}
  },
  computed:{},
  created(){},
  mounted(){},
  methods:{
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
  }
}
</script>