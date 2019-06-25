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
    <swiper :options="swiperOption">
      <swiper-slide>
        <img :src="images[0]" alt="">
      </swiper-slide>
      <swiper-slide>
        <img :src="images[1]" alt="">
      </swiper-slide>
      <swiper-slide>
        <img :src="images[2]" alt="">
        <div class="input-group">
          <button class="yellow" @click="toMain">{{$t('guide')}}</button>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      images: [
        "https://lbtc.io/wallet/static/guide/1.jpg",
        "https://lbtc.io/wallet/static/guide/2.jpg",
        "https://lbtc.io/wallet/static/guide/3.jpg"
      ],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    localStorage.setItem("guide", true);
  },
  activated() {},
  methods: {
    toMain() {
      this.localforage.getItem('current_wallet').then( res => {
        if (res) {
          this.$router.push({ path: "/" });
        } else {
          this.$router.push({ path: "/create-index" });
        }
      })
    }
  }
};
</script>