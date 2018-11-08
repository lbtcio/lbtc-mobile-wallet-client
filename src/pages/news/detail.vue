<style lang="scss" scoped>
#news-detail{
  .ellipsis-2 {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .content {
    p {
      img{
        width: 100%;
      }
    }
  }
  .author {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
    .name {
      color: #999;
    }
    .time {
      color: #999;
    }
  }
  .detail-detail {
    -webkit-user-select: text;
    user-select: text;
  }
}
</style>
<template>
  <div id="news-detail">
    <van-nav-bar :title="info.title" fixed left-arrow @click-left="onClickLeft" />
    <div class="container fixed-container">
      <!-- 
        <div class="author">
          <span class="name">{{info.author_name}}</span>
           
          <span class="time">{{info.published_at}}</span>
        </div>
       -->
      <p>{{info.title}}</p>
      <div class="detail-detail" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      info: {}
    }
  },
  computed:{},
  created(){
    this.detailInit()
  },
  mounted(){},
  methods:{
    detailInit() {
      this.info = JSON.parse(this.$route.query.content);
      let reg = new RegExp('<img', 'ig');
      this.info.content = this.info.content.replace( reg, '<img style="width: 100%;"');
    },
    onClickLeft() {
      this.$router.back();
    },
  },
  destroyed(){
    this.info = {};
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  watch:{
    
  },
}
</script>