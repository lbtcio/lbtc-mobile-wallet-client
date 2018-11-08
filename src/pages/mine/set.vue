<style lang="scss" scoped>
#mine-set{
  
}
</style>
<template>
  <div id="mine-set">
    <van-nav-bar :title="$t('mine.set.navTitle')" fixed left-arrow @click-left="onClickLeft" />

    <div class="container fixed-container">
      <van-cell-group>
        <van-cell :title="$t('mine.set.lang')" :value="$t('mine.set.langType')" @click="openLang = true" />
        <!-- <van-cell title="清除缓存" @click="clearLocal" /> -->
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
    txInfo () {
      return this.$store.state.txInfo
    },
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

    onClickLeft() {
      this.$router.back();
    },

    onSelect(item) {
      let locale = this.$i18n.locale;
      if (locale != item.type) {
        this.$i18n.locale = item.type;
        localStorage.setItem('locale', item.type);
      }
      this.openLang = false;
    },
    
    clearLocal() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要清除缓存，钱包将会被删除'
      }).then(() => {
        // on confirm
        Toast.loading({
          mask: true,
          message: '清除中...'
        });
        setTimeout(()=> {
          this.localforage.clear().then( res => {
            Toast.clear();
          })
        }, 500);
      }).catch(() => {
        // on cancel
      });
    },
  },
  destroyed(){},
  watch:{
    txInfo(val) {
      if (!val) {
        this.$router.push({ path:'/mine-addr' });
      }
    }
  },
}
</script>