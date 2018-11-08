<style lang="scss" scoped>
  .swiper-container {
    width: 100vw;
    height: 100vh;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      img {
        width: 96vw;
      }
    }
    .input-group {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 40px;
    }
  }
</style>

<template>
  <!-- Swiper -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img :src="images[0]" alt="">
      </div>
      <div class="swiper-slide">
        <img :src="images[1]" alt="">
      </div>
      <div class="swiper-slide">
        <img :src="images[2]" alt="">
        <div class="input-group">
          <button class="yellow" @click="toMain">{{$t('guide')}}</button>
        </div>
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'; 
export default {
  components: {
    Swiper
  },
  props: {},
  data() {
    return {
      images: [
        "http://lbtc.io/wallet/static/guide/1.jpg",
        "http://lbtc.io/wallet/static/guide/2.jpg",
        "http://lbtc.io/wallet/static/guide/3.jpg"
      ]
    };
  },
  computed: {
    
  },
  created() {
    },
  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      loop:false,
      pagination: {
        el: '.swiper-pagination',
      }
    })
    localStorage.setItem('guide', true);
    
  },
  activated() {
    },
  methods: {
    toMain() {
      this.$router.push({ path: "/" });
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