<style lang="scss" scoped>
#mine-addrs{
  height: 100vh;
  .addrs-title {
    padding: 12px 0;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #999;
  }
}
</style>
<template>
  <div id="mine-addrs">
    <van-nav-bar :z-index="1000" :title="$t('mine.addrs.navTitle')" fixed left-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="add-o" slot="right" />
    </van-nav-bar>

    <scroller class="container fixed-container" :on-refresh="refresh" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">
      <div class="text-center f666" v-if="noAddrs">
        <img class="nodata" src="https://lbtc.io/wallet/static/img/nodata.png">
        {{$t('mine.addrs.msg1')}} <a href="#/mine-addrInfo">{{$t('mine.addrs.msg2')}}</a>
      </div>
      <div class="addrs-content" v-if="!noAddrs">
        <div class="addrs-item" v-for="(item, index) in addrs" @click="toAddrInfo(item)">
          <div class="addrs-item-name ellipsis">{{item.name}}</div>
          <div class="addrs-item-addr ellipsis hash">{{item.addr}}</div>
          <div class="addrs-item-other ellipsis">{{item.other}}</div>
        </div>
      </div>
    </scroller>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      address:'',
      noAddrs: false,
      showAddrs: false,
      showConfirmInfo: false,
      addrs: []
    }
  },
  computed:{},
  created(){
  },
  mounted(){
    this.addrsInit();
  },
  methods:{
    addrsInit() {
      setTimeout(() => {
        Toast.clear()
      }, 1000)
      this.localforage.getItem('addrs').then( addrs => {
        if (addrs && addrs.length > 0) {
          this.addrs = addrs;
          this.noAddrs = false;
        } else {
          this.addrs = [];
          this.noAddrs = true;
        }
      });
    },

    onClickLeft() {
      this.$router.replace({ path:'/main-index/mine' });
    },

    onClickRight() {
      this.$router.push({ path:'/mine-addrInfo' });
    },

    toAddrInfo(params) {
      this.$router.push({ path:'/mine-addrInfo',query: { name: params.name, addr: params.addr, other: params.other }});
    },
    
    refresh(done) {
      this.addrsInit();
      setTimeout(() => {
        done();
      }, 1000);
    }
  }
}
</script>