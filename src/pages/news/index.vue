<style lang="scss" scoped>
#news-index {
  height: 100vh;
  .fixed-container {
    height: 100%;
  }
  padding-bottom: 48px;
  .van-swipe {
    min-height: 210px;
  }
  .ellipsis-2 {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .news-item {
    display: flex;
    padding: 8px 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    .item-img {
      flex: 0;
      img {
        max-width: initial;
        width: 90px;
        height: 74px;
      }
      padding-right: 15px;
    }
    .item-content {
      flex: 1;
      position: relative;
      .item-tittle {
        color: #333;
      }
      .item-info {
        color: #666;
        font-size: 13px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        .info-time {
          float: right;
        }
      }
    }
  }
  .list-enter-active {
    transition: all 1s;
  }
  .list-leave-active {
    transition: all 0.2s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>

<template>
  <div id="news-index">
    <!-- 
      <van-swipe :autoplay="3000" :show-indicators='deFalse'>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
     -->

    <van-nav-bar :title="$t('main.tabName2')" fixed />

    <scroller class="fixed-container" :on-refresh="refresh" :on-infinite="infinite" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">

      <div class="text-center f666" v-if="noData">
        <img class="nodata" src="http://lbtc.io/wallet/static/img/nodata.png">
        {{$t('main.noData')}}
      </div>

      <div class="content" v-if="!noData" is="transition-group" name="list">
          <div class="news-item" v-for="(item, index) in items" :key="index" @click="open_detail(item)" v-if="index < num">
            <div class="item-img">
              <img :src="item.cover" alt="">
            </div>
            <div class="item-content">
              <div class="item-tittle ellipsis-2">
                {{item.title}}
              </div>
              <div class="item-info">
                <div class="info-time">
                  {{item.published_at}}
                </div>
                <div class="info-author">
                  {{item.author_name}}
                </div>
              </div>
            </div>
          </div>
      </div>

    </scroller>

  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      deFalse: false,
      noData: false,
      images: [
        "http://lbtc.io/wallet/static/img/news1.png",
        "http://lbtc.io/wallet/static/img/news2.png",
        "http://lbtc.io/wallet/static/img/news3.png"
      ],
      items: [],
      num: 10,
      allLoaded: false,
      timer: 0
    };
  },
  computed: {
    x() {
      return this.$store.state.news.x;
    },
    y() {
      return this.$store.state.news.y;
    },
    list() {
      return this.$store.state.news.list;
    }
  },
  created() {
    this.newsInit();
  },
  mounted() {
    
  },
  activated() {
    
  },
  methods: {
    newsInit() {
      if (this.list && this.list.length) {
        this.items = this.list;
        this.noData = false;
        this.num = this.$store.state.news.num;
        setTimeout( ()=> {
          this.$refs.myscroller.scrollTo(this.x, this.y);
        },50)
      } else {
        this.localforage.getItem("newsList").then(list => {
          if (list) {
            this.items = list;
            this.noData = false;
            this.num = this.$store.state.news.num;
            setTimeout( ()=> {
              this.$refs.myscroller.scrollTo(this.x, this.y);
            },50);
            this.$store.commit('saveNewsList', {
              list: list
            });
          } else {
            this.getList();
          }
        });
      }
    },

    open_detail(param) {
      let {left, top} = this.$refs.myscroller.getPosition()
      this.$store.commit('saveNewsXY', {
        left: left,
        top: top,
        num: this.num
      });
      this.$router.push({
        path: "/news-detail",
        query: { content: JSON.stringify(param) }
      });
    },

    getList() {
      this.$http
        .get(this.$api.api.getNewsList, { addr: "a" })
        .then(res => {
          // this.items = this.testData;
          this.items = res.msg;
          this.noData = false;
          this.$store.commit('saveNewsList', {
            list: this.items
          });
          this.num = 10;
          this.localforage.setItem("newsList", this.items).then(res => {
            if (res) {
              return true;
            }
          });
        });
    },

    infinite(done) {
      setTimeout(() => {
        if (this.num < this.items.length) {
          this.num = this.num + 10;
          // this.$refs.myscroller.resize();
          done();
        } else {
          this.$refs.myscroller.finishInfinite(true);
        }
      }, 200);
    },

    refresh(done) {
      this.getList();
      setTimeout(() => {
        done();
      }, 1000);
    }
  },
  beforeDestroy() {

  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    $route(to, from) {
    }
  }
};
</script>