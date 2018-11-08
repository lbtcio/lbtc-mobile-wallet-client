<style lang="scss" scoped>
#mine-tx-his{
  height: 100vh;
  .nodata {
    height: 100px;
    display: block;
    margin: 30px auto 10px;
  }
  .list-enter-active {
    transition: all 1s;
  }
  .list-leave-active {
    transition: all 0.2s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
<template>
  <div id="mine-tx-his">
    <van-nav-bar :title="$t('mine.txHis.navTitle')" fixed left-arrow @click-left="onClickLeft" />

    <scroller class="container fixed-container" :on-refresh="refresh" :on-infinite="infinite" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">

      <p>{{$t('mine.txHis.title')}}</p>
      <div class="text-center f666" v-if="nodata">
        <img class="nodata" src="http://lbtc.io/wallet/static/img/nodata.png">
        {{$t('mine.txHis.msg1')}}
      </div>

      <div v-if="!nodata" is="transition-group" name="list">
        <div class="tx-item" v-for="(item, index) in showTxs" @click="toHisInfo(item)" :key="item.hash + index">
          <div class="tx-type">
              <img :src="item.type ? 'http://lbtc.io/wallet/static/img/wallet-' + item.type + '.png' : 'http://lbtc.io/wallet/static/img/wallet-r.png'">
          </div>
          <div class="tx-info">
            <div class="tx-id ellipsis">{{item.hash | formatHash}}</div>
            <div class="tx-time" style="word-break:keep-all;">{{item.time | formatTime(1)}}</div>
          </div>
          <div class="tx-value" :class="item.type == 's' ? 'send' : 're' ">
            {{item.type == 's' ? '-' : '+'}}{{item.value}} LBTC
          </div>
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
      current_wallet: '',
      nodata: false,
      isLoading: false,
      loading: false,
      finished: false,
      txsDetails: {},
      UnSpent: {},
      showTxs: [],
      pageCount: 50,
      page: 1,
      totalPage: 0,
      infiniteStatus: true
    }
  },
  computed:{
    x() {
      return this.$store.state.txHis.x;
    },
    y() {
      return this.$store.state.txHis.y;
    }
  },
  created(){
    this.hisInit();
  },
  mounted(){
    
  },
  methods:{
    hisInit() {

      this.localforage.getItem('current_wallet').then( res => {
        if (res) {
          this.current_wallet = res;
          Promise.all([this.localforage.getItem(res + '+txsDetails'), this.localforage.getItem(res + '+unspent')]).then( data => {
            if (data[0] && data[1]) {
              this.txsDetails = data[0];
              if (this.txsDetails.txsList.length) {
                this.showTxs = this.txsDetails.txsList.slice(0, this.page * this.pageCount);
                this.totalPage = Math.ceil(this.txsDetails.txsList.length / this.pageCount);
                this.nodata = false;
              } else {
                this.nodata = true;
              }
              setTimeout( ()=> {
                this.$refs.myscroller.scrollTo(this.x, this.y);
              },10)
              this.UnSpent = data[1];
            }
          })
        } else {
          this.$router.push({ path: "/create-index" });
        }
      })
    },

    onClickLeft() {
      this.$router.back();
    },

    refresh(done) {
      setTimeout(() => {
        this.getTxByAdd(this.current_wallet, done);
      }, 500);
    },

    getTxByAdd(addr, done) {
      this.$http.get(this.$api.api.getHeight, { addr: addr }).then(res => {
        if (res.error) {
          return Promise.reject(res.msg)
        } else {
          return Promise.resolve(res.msg);
        }
      })
      .then(height => {
        let total_height = height;
        let current_height = this.txsDetails.current_height;
        let tx_list = [];
        this.$http.get(this.$api.api.getTxByAddr, {
          addr: addr,
          start: current_height,
          end: total_height
        }).then(result => {
          if (result.error) {
            return Promise.reject(result.msg)
          } else {
            tx_list = result.msg;
          }
          this.getTxsDetails(tx_list, total_height, addr, done);
        });
      })
      .catch(error => {
        Toast({
          duration: 1500,
          message: error
        });
      });
    },

    getTxsDetails(tx_list, total_height, current_wallet, done) {
      // let txsDetails = {};
      let proList = [];
      let txsList = [];
      let newUnSpent = {};

      if (tx_list.length) {

        let txGroup = this.chunkArry(tx_list, 50);

        this.Wallet.queue(txGroup, current_wallet).then( txsList => {
          return Promise.resolve(txsList)
        }).then( txsList => {
          newUnSpent = this.Wallet.addListUnSpent(txsList, current_wallet, total_height, this.UnSpent);
          this.txsDetails.current_height = total_height;
          this.txsDetails.txsList = txsList.concat(this.txsDetails.txsList);
          return Promise.resolve(
            Promise.all([
              this.localforage.setItem(current_wallet + "+unspent", newUnSpent),
              this.localforage.setItem(current_wallet + "+txsDetails", txsDetails)
            ]).then( res => {
              return Promise.resolve(res)
            })
          )

        }).then(res => {
          Toast({
            duration: 1500,
            message: this.$t('mine.txHis.msg2')
          })
          done()
          return true;
        })

      } else {
        this.txsDetails.current_height = total_height;
        Promise.all([
          this.localforage.setItem(current_wallet + "+txsDetails", this.txsDetails)
        ]).then( res => {
          Toast({
            duration: 1500,
            message: this.$t('mine.txHis.msg3')
          })
          done()
          return true;
        })
      }

    },

    infinite(done) {
      // Trigger
      if (this.page >= this.totalPage) {
        this.$refs.myscroller.finishInfinite(2);
        return
      }
      // Action
      if (this.infiniteStatus) {
        this.infiniteStatus = false;
        window.setTimeout(() => {
          this.page = this.page + 1;
          this.showTxs = this.txsDetails.txsList.slice(0, this.page * this.pageCount);
          done()
          this.infiniteStatus = true;
        }, 1500)
      }
    },

    toHisInfo(param) {
      let {left, top} = this.$refs.myscroller.getPosition()
      this.$store.commit('saveTxHisXY', {
        left: left,
        top: top,
        page: this.page
      });
      this.$router.push({ path:'/mine-tx-hisInfo', query: { txInfo: JSON.stringify(param)} });
    },

    

  },
  destroyed(){},
  watch:{},
}
</script>