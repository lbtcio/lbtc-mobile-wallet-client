<style lang="scss" scoped>
#mine-about{
  .about-header {
    text-align: center;
    padding-top: 30px;
    img {
      height: 100px;
    }
    .version {
      color: #666;
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
    }
    .about-introduction {
      color: #999;
      font-size: 13px;
      padding: 5px 30px 30px;
    }
  }
  .van-popup--right {
    width: 100%;  
    height: 100%;
  }
  .term-content {
    p {
      font-size: 12px;
      letter-spacing: .5px;
    }
  }
  .version-content {
    p {
      font-size: 14px;
      letter-spacing: .5px;
      font-weight: bold;
    }
    ul {
      margin-left: 30px;
      list-style-type: disc;
      color: #333;
      font-size: 14px;
      li {
        word-break: break-all;
      }
    }
  }
}
</style>
<template>
  <div id="mine-about">
    <van-nav-bar :title="$t('mine.about.navTitle')" fixed left-arrow @click-left="onClickLeft" />

    <div class="container fixed-container">
      <div class="about-header">
        <img class="" src="http://lbtc.io/wallet/static/img/logo.png" alt="">
        <div class="version">
          {{$t('mine.about.currentVersion')}} v{{currrntVersion}}
        </div>
        <div class="about-introduction">
          {{$t('mine.about.about')}}
        </div>
      </div>
      <van-cell-group>
        <van-cell :title="$t('mine.about.term')" is-link @click="openTerms = true"/>
        <van-cell :title="$t('mine.about.log')" is-link @click="openVersionLog = true"/>
        <van-cell :title="$t('mine.about.checkVersion')" @click="checkVersion"/>
      </van-cell-group>
    </div>

    <!-- Term -->
    <van-popup v-model="openTerms" position="right">
      <van-nav-bar
        :title="$t('create.create.termTitle')"
        left-arrow
        fixed 
        @click-left="openTerms = false"
      />
      <div class="container fixed-container term-content" v-html="termContent">
      </div>
    </van-popup>

    <!-- Log -->
    <van-popup v-model="openVersionLog" position="right">
      <van-nav-bar
        :title="$t('mine.about.log')"
        left-arrow
        fixed 
        @click-left="openVersionLog = false"
      />
      <div class="container fixed-container version-content">
        <div v-for="item in logContent">
          <p>{{item.version}}</p>
          <ul>
            <li v-for="l in item.content">{{l}}</li>
          </ul>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Toast } from 'vant';
import wConfig from "../../factory/wallet/config.js"

export default {
  components:{
    
  },
  props:{},
  data(){
    return {
      currrntVersion: '',
      termContent: '',
      logContent: '',
      activeName: 0,
      openTerms: false,
      openVersionLog: false
    }
  },
  computed:{
    
  },
  created(){
    this.currrntVersion = wConfig.version;
    this.termContent = wConfig.terms;
    this.logContent = this.$t('versionLog');
  },
  mounted(){},
  methods:{
    onClickLeft() {
      this.$router.back();
    },

    checkVersion() {
      Toast.loading({
        mask: true,
        message: this.$t('mine.about.checkVersionLoading')
      });
      this.$http.get(this.$api.api.getversion, {
        param: 'getversion'
      }).then( res => {
        this.vData = res;
        if (this.versionCompare(this.vData.version, wConfig.version)) {
          this.openDialog();
        } else {
          window.setTimeout( ()=> {
            Toast({
              duration: 1500,
              message: this.$t('mine.about.checkVersionMsg1')
            });
          }, 500)
        }
      })
    },

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
  destroyed(){},
  watch:{
    
  },
}
</script>