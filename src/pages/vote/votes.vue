<style lang="scss" scoped>
#vote-votes {
  .content {
    padding: 15px 0;
    font-size: 12px;
    color: #666;
    .tag {
      margin: 5px;
      float: left;
    }
  }
}
</style>
<template>
  <div id="vote-votes">
    <van-nav-bar :title="$t('vote.votes.navTitle')" fixed left-arrow @click-left="onClickLeft" />

    <div class="container fixed-container">
      <div class="content">
        <div class="tag" v-for="item in votesList">
          {{item.name ? item.name : item.address}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { Toast } from "vant";
export default {
  components: {
    QrcodeVue
  },
  props: {},
  data() {
    return {
      showNum: false,
      votesList: []
    };
  },
  computed: {},
  created() {
    this.votesInit();
  },
  mounted() {},
  methods: {
    votesInit() {
      this.votesList = JSON.parse(this.$route.query.votes);
    },
    onClickLeft() {
      this.$router.back();
    }
  },
  destroyed() {},
  watch: {}
};
</script>