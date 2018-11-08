<style lang="scss" scoped>
#app {
  .left-enter-active {
    animation-name: left-in;
    animation-duration: 0.2s;
    animation-timing-function: linear;
  }
  .left-leave-active {
    animation-name: left-out;
    animation-timing-function: linear;
    animation-duration: 0.2s;
  }
  @keyframes left-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    50% {
      transform: translate3d(-50%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(-50%, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
  .right-enter-active {
    animation-name: right-in;
    animation-duration: 0.2s;
    animation-timing-function: linear;
  }
  .right-leave-active {
    animation-name: right-out;
    animation-timing-function: linear;
    animation-duration: 0.2s;
  }
  @keyframes right-in {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    50% {
      transform: translate3d(50%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes right-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(50%, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
  touch-action: none;
}
</style>

<template id='app'>
    <transition name="fade" mode="out-in">
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
    </transition>
</template>

<script>
import Vue from "vue";

export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left",
      current_path: ''
    };
  },
  created() {
    
    let ifGuide = localStorage.getItem('guide');
    if (!ifGuide) {
      this.$router.push({ path: "/guide" });
    } else {
      this.localforage.getItem('current_wallet').then( res => {
        if (res) {
          return false
        } else {
          this.$router.push({ path: "/create-index" });
          return false
        }
      })
    }

  },
  methods: {},
  watch: {
    $route(to, from) {
      
    }
  }
};
</script>

<style>
</style>
