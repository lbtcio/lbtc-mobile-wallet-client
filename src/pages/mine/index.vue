<style lang="scss" scoped>
#mine-index{
  .mine-header {
    padding: 30px 0 60px 0;
    background-color: #f6b330;
    background-image: url('http://lbtc.io/wallet/static/img/mine-bg.png');
    background-size: 100%;
    position: relative;
    .mine-photo {
      height: 48px;
      width: 48px;
      margin: 0 auto;
      // border-radius: 50%;
      // background-color: #fff;
      img {
        height: 100%;
      }
    }
    .mine-name {
      padding-top: 6px;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 20px;
      color: #fff;
      font-weight: 600;
      margin-bottom: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .mine-action {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      background-color: #fff;
      margin: 0 42px;
      padding: 12px 0;
      border-radius: 3px;
      box-shadow: 0px 0px 2px 1px #f6b330;
      color: #666;
      font-size: 14px;
      img {
        height: 36px;
        margin-bottom: 2px;
      }
      .action-left {
        flex: 1;
      } 
      .action-right {
        flex: 1;
      }
      .action-middle {
        height: 61px;
        width: 1px;
        border-color: rgba(246, 179, 48, .4);
        background-color: rgba(246, 179, 48, .4);
      }
    }
  }
}
</style>
<template>
  <div id="mine-index">
    <div class="mine-header text-center">
      <div class="mine-photo">
        <img :src="'http://lbtc.io/wallet/static/img/photo/0/' + current_userInfo.photo + '.png'" alt="">
      </div>
      <div class="mine-name">
        {{current_userInfo.name}}
      </div>
      <div class="mine-action">
        <div class="action-left" @click="toManage">
          <img src="http://lbtc.io/wallet/static/img/mine-wallet-man.png" alt="">
          <div>
            {{$t('mine.index.title1')}}
          </div>
        </div>
        <div class="action-middle">

        </div>
        <div class="action-right" @click="toTxHis">
          <img src="http://lbtc.io/wallet/static/img/mine-tx-his.png" alt="">
          <div>
            {{$t('mine.index.title2')}}
          </div>
        </div>
      </div>
    </div>
    <div class="mine-content container" style="margin-top: 50px;">
      <van-cell-group>
        <van-cell :title="$t('mine.index.title3')" is-link icon="pending-orders" url="#/mine-addrs"/>
        <van-cell :title="$t('mine.index.title4')" is-link icon="setting" url="#/mine-set"/>
        <van-cell :title="$t('mine.index.title5')" is-link icon="question" url="#/mine-help"/>
        <van-cell :title="$t('mine.index.title6')" is-link icon="info-o" url="#/mine-about"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      wallet_list: {},
      current_wallet: '',
      current_userInfo: {}
    }
  },
  computed:{},
  created(){
    this.init();
  },
  mounted(){},
  methods:{
    init() {
      this.localforage.getItem("wallet_list").then(list => {
        if (list) {
          this.localforage.getItem("current_wallet").then( data=> {
            this.wallet_list = list;
            this.current_wallet = data;
            this.current_userInfo = list[data];
          })
        } else {
          this.$router.push({ path: "/create-index" });
        }
      })
    },
    
    toManage() {
      this.$router.push({ path:'/mine-manage' });
    },

    toTxHis() {
      this.$router.push({ path:'/mine-tx-his' });
    }
  },
  destroyed(){},
  watch:{},
}
</script>