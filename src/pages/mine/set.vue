<style lang="scss" scoped>
#mine-set{
  
}
</style>
<template>
  <div id="mine-set">
    <van-nav-bar :z-index="1000" :title="$t('mine.set.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="container fixed-container">
      <van-cell-group>
        <van-cell :title="$t('mine.set.lang')" :value="$t('mine.set.langType')" @click="openLang = true" />
      </van-cell-group>
    </div>

    <van-actionsheet
      v-model="openLang"
      :actions="langActions"
      @select="onSelect"
    />

  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { Toast } from 'vant';
export default {
  components:{
    QrcodeVue
  },
  props:{},
  data(){
    return {
      openLang: false,
      current_lang: '',
      langActions: [
        {
          name: '中文',
          type: 'zh'
        },
        {
          name: 'English',
          type: 'en'
        }
      ]
    }
  },
  computed:{
    currentHisAddress() {
      return this.$store.state.currentHisAddress
    }
  },
  created(){
    this.hisInit();
  },
  mounted(){},
  methods:{
    hisInit() {
      
    },

    onSelect(item) {
      let locale = this.$i18n.locale;
      if (locale != item.type) {
        this.$i18n.locale = item.type;
        localStorage.setItem('locale', item.type);
      }
      this.openLang = false;
    }
  }
}
</script>