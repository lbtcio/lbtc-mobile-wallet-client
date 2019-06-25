<style lang="scss" scoped>
#home {
  touch-action: none;
}
</style>
<template>
  <transition name="fade" mode="out-in">
    <keep-alive include="main-index">
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: "home",
  mounted() {
    
  }
};
</script>