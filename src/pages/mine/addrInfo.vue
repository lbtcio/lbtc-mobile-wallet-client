<style lang="scss" scoped>
#mine-addrInfo{
  .addrInfo-item {
    margin-top: 24px;
    position: relative;
    z-index: 0;
    label {
      width: 100%;
      color: #333;
    }
    input {
      color: #666;
      font-size: 14px;
      width: 100%;
      border: none;
      border-bottom: 1px solid #ccc;
      padding: 6px;
    }
    span {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      padding: 6px;
    }
  }
}
</style>
<template>
  <div id="mine-addrInfo">
    <van-nav-bar
      :title="$t('mine.addrInfo.navTitle')"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container">
      <div class="addrInfo-item">
        <label for="fromAddr">
          {{$t('mine.addrInfo.name')}}
        </label>
        <input type="text" id="fromAddr" :placeholder="$t('mine.addrInfo.name')" v-model="name"/>
      </div>
      <div class="addrInfo-item">
        <label for="toAddr">
          {{$t('mine.addrInfo.addr')}}
        </label>
        <input type="text" id="toAddr" :placeholder="$t('mine.addrInfo.addrPlaceholder')" v-model="addr"/>
      </div>
      <div class="addrInfo-item">
        <label for="value">
          {{$t('mine.addrInfo.other')}}
        </label>
        <input type="text" id="value" :placeholder="$t('mine.addrInfo.other')" v-model="other"/>
      </div>
      <div class="input-group" style="padding-top: 80px">
        <button class="default" @click="saveAddr()">{{bottonContent}}</button>
        <button class="warn" @click="deleAddr()" v-if="buttonType == 2">{{$t('mine.addrInfo.bottonContent3')}}</button>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      buttonType: 1,
      bottonContent: '',
      addrs: [],
      current_addr: '',
      name: '',
      addr: '',
      other: '',
      isFromSend: false
    }
  },
  computed:{},
  
  created(){
    this.addrInfoInit();
  },
  mounted(){},
  methods:{
    onClickLeft() {
      this.$router.back();
    },

    setData(param) {
      this.isFromSend = true;
    },

    addrInfoInit() {
      if (this.isEmptyObject(this.$route.query)) {
        this.name = '';
        this.addr = '';
        this.other = '';
        this.buttonType = 1;
        this.bottonContent = this.$t('mine.addrInfo.bottonContent1');
      } else {
        this.name = this.$route.query.name;
        this.addr = this.$route.query.addr;
        this.current_addr = this.$route.query.addr;
        this.other = this.$route.query.other;
        this.buttonType = 2;
        this.bottonContent = this.$t('mine.addrInfo.bottonContent2');
      }
      this.localforage.getItem('addrs').then( addrs => {
        if (addrs) {
          this.addrs = addrs;
        } else {
          this.addrs = [];
        }
      })
    },

    saveAddr() {
      if (!this.name.toString().trim().length) {
        Toast({
          duration: 1500,
          message: this.$t('mine.addrInfo.msg1')
        });
        return false
      }
      if (!this.addr.toString().trim().length) {
        Toast({
          duration: 1500,
          message: this.$t('mine.addrInfo.msg2')
        });
        return false
      }
      if (!this.isAddress(this.addr)) {
        Toast({
          duration: 1500,
          message: this.$t('mine.addrInfo.msg3')
        });
        return false
      }

      if (this.buttonType == 1) {
        let obj = {
          name: this.name,
          addr: this.addr,
          other: this.other
        }
        
        this.addrs.push(obj);
        this.localforage.setItem('addrs', this.addrs).then( res => {
          if (res) {
            Toast.success({
              duration: 1500,
              message: this.$t('mine.addrInfo.msg4')
            });
            if (this.isFromSend) {
              this.$router.push({ path: '/wallet-send', query: { toaddr: this.addr}})
              return false
            } else {
              this.$router.push({ path:'/mine-addrs' });
              return false
            }
          }
        }).catch( error=> {
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.addrInfo.msg5')
          });
        })
      } else if (this.buttonType == 2) {
        for (let i = 0; i < this.addrs.length; i++) {
          const element = this.addrs[i];
          if (this.current_addr == element.addr) {
            element.addr = this.addr;
            element.name = this.name;
            element.other = this.other;
            break
          }
        }
        this.localforage.setItem('addrs', this.addrs).then( res => {
          if (res) {
            Toast.success({
              duration: 1500,
              message: this.$t('mine.addrInfo.msg6')
            });
            if (this.isFromSend) {
              this.$router.push({ path: '/wallet-send', query: { toaddr: this.addr}})
              return false
            } else {
              this.$router.push({ path:'/mine-addrs' });
              return false
            }
          }
        }).catch( error=> {
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.addrInfo.msg7')
          });
        })
      }
    },

    deleAddr() {
      this.$dialog.confirm({
        title: this.$t('mine.addrInfo.dialogTitle'),
        message: this.$t('mine.addrInfo.dialogContent'),
        confirmButtonText: this.$t('create.packup.confirmButtonText'),
        cancelButtonText: this.$t('create.packup.cancelButtonText')
      }).then(()=> {
        for (let i = 0; i < this.addrs.length; i++) {
          const element = this.addrs[i];
          if (this.current_addr == element.addr) {
            this.addrs.splice(i, 1);
            break
          }
        }
        this.localforage.setItem('addrs', this.addrs).then( res => {
          if (res) {
            Toast.success({
              duration: 1500,
              message: this.$t('mine.addrInfo.msg8')
            });
            if (this.isFromSend) {
              this.$router.push({ path: '/wallet-send' })
              return false
            } else {
              this.$router.push({ path:'/mine-addrs' });
              return false
            }
          }
        }).catch( error=> {
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.addrInfo.msg9')
          });
        })
      }).catch(() => {
        return false
      })
    }
  },
  destroyed(){},
  watch:{
    $route(to, from) {
      
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name == 'wallet-send') {
      next(vm => vm.setData(true))
    }
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
}
</script>