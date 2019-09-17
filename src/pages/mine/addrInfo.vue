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
      border-radius: 0;
      border-bottom: 1px solid #ccc;
      padding: 6px;
    }
    input[readonly] {
      border-bottom: none;
    }
    span {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      padding: 6px;
    }
    .error-msg {
      position: absolute;
      color: #e51313;
      font-size: 12px;
      margin: 0 5px;
    }
  }
}
</style>
<template>
  <div id="mine-addrInfo">
    <van-nav-bar :z-index="1000" 
      :title="$t('mine.addrInfo.navTitle')"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container">

      <div class="addrInfo-item">
        <label for="fromAddr">
          {{$t('register.nickname')}}
        </label>
        <input type="text" id="fromAddr" :placeholder="$t('register.nickname')" v-model="name" readonly/>
      </div>

      <div class="addrInfo-item">
        <label for="toAddr">
          {{$t('register.addr')}}
        </label>
        <input class="hash" type="text" id="toAddr" :placeholder="$t('register.addr')" v-model="addr" @change="checktoAddr"/>
        <label for="value" class="error-msg" v-if="msg">{{msg}}</label>
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
      name: '',
      addr: '',
      other: '',
      msg: '',
      addrDefaultNum: {},
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
      if (this.isFromSend) {
        this.$router.replace({ path: '/wallet-send' })
      } else {
        this.$router.replace({ path:'/mine-addrs' });
      }
    },

    addrInfoInit() {
      this.addrDefaultNum = localStorage.getItem('addrDefaultNum') ? JSON.parse(localStorage.getItem('addrDefaultNum')) : {};
      this.localforage.getItem('addrs').then( addrs => {
        if (addrs) {
          this.addrs = addrs;
        } else {
          this.addrs = [];
        }
      })
      if (this.isEmptyObject(this.$route.query)) {
        this.name = '';
        this.addr = '';
        this.other = '';
        this.buttonType = 1;
        this.bottonContent = this.$t('mine.addrInfo.bottonContent1');
      } else {
        if (this.$route.query.fromSend) {
          this.isFromSend = this.$route.query.fromSend;
          this.buttonType = 1;
          this.bottonContent = this.$t('mine.addrInfo.bottonContent1');
        } else {
          this.name = this.$route.query.name;
          this.addr = this.$route.query.addr;
          this.other = this.$route.query.other;
          this.buttonType = 2;
          this.bottonContent = this.$t('mine.addrInfo.bottonContent2');
        }
      }
    },

    checktoAddr() {
      return new Promise((resolve) => {
        if (this.addr == '') {
          this.msg = this.$t('mine.addrInfo.msg2');
        } else if (!this.isAddress(this.addr)) {
          this.msg = this.$t('mine.addrInfo.msg3');
        } else {
          let n = this.selectDefaultNum(this.addrDefaultNum);
          this.$http.get(this.$api.api.getUsername, { param: this.addr, isHide: 1 }).then( r => {
            if (r.error) {
              // if (!this.findDefaultNum(this.name)) {
              //   this.name = 'Default_' + n;              
              // }
              this.name = '';
            } else {
              this.name = r.msg;
            }
            this.msg = '';
            resolve(true)
          }).catch( e => {
            // if (!this.findDefaultNum(this.name)) {
            //   this.name = 'Default_' + n;              
            // }
            this.msg = '';
            resolve(true)
          })
        }
      })
    },

    selectDefaultNum(addrDefaultNum) {
      for (let i = 1; i < 100; i++) {
        if (!addrDefaultNum[i]) {
          return i
        }
      }
    },

    // findDefaultNum(name) {
    //   if (name.indexOf('Default') < 0) {
    //     return 0
    //   } else {
    //     return Number(name.slice(8))
    //   }
    // },

    async saveAddr() {
      await this.checktoAddr();
      if (this.msg) {
        Toast.clear();
        return
      }
      let isDifferent = true;
      for (let i = 0; i < this.addrs.length; i++) {
        const element = this.addrs[i];
        if (this.addr == element.addr) {
          // if (this.findDefaultNum(element.name)) {
          //   this.addrDefaultNum[this.findDefaultNum(element.name)] = false;
          // }
          element.addr = this.addr;
          element.name = this.name;
          element.other = this.other;
          isDifferent = false;
          break
        }
      }

      if (isDifferent) {
        this.addrs.push({
          name: this.name,
          addr: this.addr,
          other: this.other
        });
      }

      this.localforage.setItem('addrs', this.addrs).then( res => {
        if (res) {
          // if (this.findDefaultNum(this.name)) {
          //   this.addrDefaultNum[this.findDefaultNum(this.name)] = true;
          //   localStorage.setItem('addrDefaultNum', JSON.stringify(this.addrDefaultNum));
          // }
          if (this.buttonType == 1) {     // Save addr
            Toast.success({
              duration: 1500,
              message: this.$t('mine.addrInfo.msg4')
            });
          }
          if (this.buttonType == 2) {     // Modify Addr
            Toast.success({
              duration: 1500,
              message: this.$t('mine.addrInfo.msg6')
            });
          }
          if (this.isFromSend) {
            this.$router.replace({ path: '/wallet-send', query: { toaddr: this.addr}})
            return false
          } else {
            this.$router.replace({ path:'/mine-addrs' });
            return false
          }
        }
      }).catch( error=> {
        if (this.buttonType == 1) {     // Save addr
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.addrInfo.msg5')
          });
        }

        if (this.buttonType == 2) {     // Modify Addr
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.addrInfo.msg7')
          });
        }
      })
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
          if (this.addr == element.addr) {
            this.addrs.splice(i, 1);
            break
          }
        }
        this.localforage.setItem('addrs', this.addrs).then( res => {
          if (res) {
            // if (this.findDefaultNum(this.name)) {
            //   this.addrDefaultNum[this.findDefaultNum(this.name)] = false;
            //   localStorage.setItem('addrDefaultNum', JSON.stringify(this.addrDefaultNum));
            // }
            Toast.success({
              duration: 1500,
              message: this.$t('mine.addrInfo.msg8')
            });
            if (this.isFromSend) {
              this.$router.replace({ path: '/wallet-send' });
              return false
            } else {
              this.$router.replace({ path:'/mine-addrs' });
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
  beforeRouteLeave (to, from, next) {
    this.$dialog.close();
    next();
  },
}
</script>