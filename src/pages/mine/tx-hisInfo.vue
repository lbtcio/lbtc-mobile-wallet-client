<style lang="scss" scoped>
#mine-tx-hisInfo{
  .hisInfo-header {
    padding: 20px 0;
    .hisInfo-icon {
      height: 40px;
    }
    .hisInfo-value {
      font-size: 20px;
      font-weight: 600;
      height: 36px;
      line-height: 36px;
    }
  }
  .hisInfo-content {
    border-top: 1px solid #eee;
    padding: 10px 10px;
    font-size: 14px;
    .hisInfo-item-title {
      padding: 4px 0 4px;
      color: #999;
    }
    .hisInfo-item-content {
      padding: 0 0 6px;
      color: #666;
      word-break: break-all;
    }
    .left {
      flex: 1;
      padding-right: 10px;
    }
    .right {
      flex: 0;
      .copy-botton {
        margin-top: 15px;
        height: 26px;
        line-height: 26px;
        background-color: #eee;
        text-align: center;
      }
    }
  }
}
</style>
<template>
  <div id="mine-tx-hisInfo">
    <van-nav-bar :z-index="1000" :title="$t('mine.txHisInfo.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="container fixed-container">
      <div class="hisInfo-header text-center">
        <img class="hisInfo-icon" src="https://lbtc.io/wallet/static/img/success@2x.png" alt="">
        <div class="hisInfo-value" :class="txInfo.type == 's' ? 'send' : 're' ">
          {{txInfo.type == 's' ? '-' : '+'}}{{txInfo.value}} LBTC
        </div>
      </div>
      <div class="hisInfo-content">
        <div class="hisInfo-item">
          <div class="hisInfo-item-title">
            {{$t('mine.txHisInfo.title1')}}
          </div>
          <div class="hisInfo-item-content" v-for="(i, index) in txInfo.vin" v-if="index < 3">
            <div v-if="i.coinbase">
              Coinbase
            </div>
            <div class="hash" v-if="!i.coinbase" v-clipboard:copy="i.addr" v-clipboard:success="onCopy" v-clipboard:error="onError">
              {{i.addr}}
            </div>
          </div>
          <div class="hisInfo-item-content text-center" v-if="txInfo.vin.length >= 3">
            ~
          </div>
        </div>
        <div class="hisInfo-item">
          <div class="hisInfo-item-title">
            {{$t('mine.txHisInfo.title2')}}
          </div>
          <div class="hisInfo-item-content" v-for="i in txInfo.vout">
            <div v-if="i.scriptPubKey.type == 'nulldata'">
              {{'Unknown'}}
            </div>
            <div class="hash" v-if="i.scriptPubKey.type != 'nulldata'" v-clipboard:copy="i.scriptPubKey.addresses[0]" v-clipboard:success="onCopy" v-clipboard:error="onError">
              {{i.scriptPubKey.addresses[0]}}
            </div>
          </div>
        </div>
        <div class="hisInfo-item" v-if="txInfo.fee">
          <div class="hisInfo-item-title">
            Fee
          </div>
          <div class="hisInfo-item-content">
            {{txInfo.fee}}
          </div>
        </div>
      </div>
      <div class="hisInfo-content flex">
        <div class="left">
          <div class="hisInfo-item">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title3')}}
            </div>
            <div class="hisInfo-item-content hash" v-clipboard:copy="txInfo.hash" v-clipboard:success="onCopy" v-clipboard:error="onError">
              {{txInfo.hash | formatHash}}
            </div>
          </div>
          <div class="hisInfo-item" v-if="txInfo.height">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title4')}}
            </div>
            <div class="hisInfo-item-content hash" v-clipboard:copy="txInfo.blockhash" v-clipboard:success="onCopy" v-clipboard:error="onError">
              {{txInfo.height}}
            </div>
          </div>
          <div class="hisInfo-item">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title5')}}
            </div>
            <div class="hisInfo-item-content">
              {{txInfo.time | formatTime(2)}}
            </div>
          </div>
        </div>
        <div class="right">
          <qrcode-vue :value="'https://explorer.lbtc.io/transinfo?param=' + txInfo.hash" size="100" level="H" class="qrcode"></qrcode-vue>
          <div class="copy-botton" v-clipboard:copy="'https://explorer.lbtc.io/transinfo?param=' + txInfo.hash" v-clipboard:success="onCopy" v-clipboard:error="onError">
            {{$t('mine.txHisInfo.title6')}}
          </div>

        </div>
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
      isLoading: false,
      txInfo: {}
    }
  },
  computed:{
    
  },
  created(){
    this.hisInit();
  },
  mounted(){},
  methods:{
    hisInit() {
      if (this.$route.query) {
        this.txInfo = JSON.parse(this.$route.query.txInfo);
      } else {
        this.$router.back();
      }
    },
    
    onCopy() {
      Toast.success({
        duration: 1500,
        message: this.$t('mine.txHisInfo.title7')
      });
    },

    onError() {
      Toast.fail({
        duration: 1500,
        message: this.$t('mine.txHisInfo.title8')
      });
    }
  }
}
</script>