<style lang="scss" scoped>
#wallet-send{
  .addrs-add {
    padding: 40px 0;
    font-size: 14px;
  }
  .qr-code {
    width: 20px;
    height: 20px;
    position: relative;
    top: 4px;
  }
}
</style>
<template>
  <div id="wallet-send">
    <van-nav-bar :z-index="1000" :title="$t('wallet.send.navTitle')" @click-left="onClickLeft" @click-right="toQrCode" left-arrow fixed>
      <img class="qr-code" v-if="isplusReady" slot="right" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABcklEQVRYR+3Xu0odURQG4M8LpLLwAkkhgYAWprGy0ioEQqwkaGz0DSL4Anb2gopvoIRA0piEWOsDKF4CKqgBFVTsBUVZcR8R5MDBgZlTzG5mz2av9f/7n7VnrdXgfnzAFHrQltZu8BVj6f25jyV8RlNycIkdTGOlAR/xu4r3Y3Q+FznZnaOjio/3QWAVA2nDPxyk+RVm8CcjgTjgJF4kP2/wOs3XgsAF2rGP7oxgtZrvJqyLIHCbrL5juFYPGfcF1qfArgsCp3iFeUxkPFmt5t8wgutQoB99iMWTWj1k3DeOWfwMAoWOkkCpQF0o0IJeNOd8Ha6xHgrsoStn8ArcVhDYxtuCCGwGgSI/wUZdBGFB6t/DlgqUCoQCixjElzTPIyijIJnDchCIBqQxVUSjeaAnrIeSrKyKK43J3xxzQiUB/m9MHrdmRzhMcRDp8gcWMsZFBPfQo3T/pDWLG/CrCsgZXmYkEN1waxUf7yo/osLa8zup8VDzDyqz/gAAAABJRU5ErkJggg==" />
    </van-nav-bar>

    <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="false" :callBack.sync="callBackObj">
      <div class="container fixed-container">
        <div class="input-with-label-group">
          <div class="input-with-label-item">
            <label for="fromAddr">
              {{$t('wallet.send.payAddr')}}
            </label>
            <input class="hash" type="text" id="fromAddr" v-model="walletDB.current" readonly />
          </div>
          <div class="input-with-label-item">
            <label for="toAddr">
              {{$t('wallet.send.receiveAddr')}}
            </label>
            <span class="addrs" @click="openAddrs = true">
              <van-icon name="pending-orders" />
            </span>
            <input class="hash" type="text" id="toAddr" :placeholder="$t('wallet.send.receiveAddrPlaceholder')" v-model.trim="toAddr.value" @change="checkToAddr"/>
            <label for="repass" class="error-msg" v-if="toAddr.msg">{{toAddr.msg}}</label>
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('wallet.send.payMoney')}}
            </label>
            <span class="addr-balance" @click="sendAll()">
              {{$t('wallet.send.balance')}}:{{walletDB.accounts[walletDB.current].availableBalance}} LBTC
            </span>
            <input type="number" id="value" :placeholder="$t('wallet.send.moneyInputPlaceholder')" v-model="count.value" @change="checkCount"/>
            <label for="repass" class="error-msg" v-if="count.msg">{{count.msg}}</label>
          </div>
        </div>
        <div class="input-group" style="padding-top: 80px">
          <button class="default" @click="next()">{{$t('wallet.send.next')}}</button>
        </div>
      </div>
    </tx-component>

    <van-popup v-model="openAddrs" position="bottom">
      <div class="container">
        <div class="popup-title">{{$t('wallet.send.selectionAddr')}}</div>
        <div class="addrs-content" v-if="addrs">
          <div class="addrs-item" v-for="(item, index) in addrs" @click="selectAddr(item.addr)">
            <div class="addrs-item-name">{{item.name}}</div>
            <div class="addrs-item-addr hash">{{item.addr}}</div>
            <div class="addrs-item-other">{{item.other}}</div>
          </div>
        </div>
        <div class="text-center addrs-add" >
          <span v-if="!addrs">{{$t('wallet.send.noAddrContent')}} </span>
          <a @click="toAddrInfo">{{$t('wallet.send.noAddrAddAddr')}}</a>
        </div>
      </div> 
    </van-popup>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      callBackObj: {
        type: '',
        content: ''
      },
      toAddr: {
        value: '',
        msg: '',
        status: false
      },
      count: {
        value: '',
        msg: '',
        status: false
      },
      openAddrs: false,
      addrs: [],
    }
  },
  computed: {
    targets() {
      return [{
        address: this.toAddr.value,
        value: this.decimal(this.count.value || 0).mul(this.wConfig.point).toNumber()
      }]
    }
  },
  created(){
    this.sendInit();
  },
  mounted(){},
  methods:{
    sendInit() {
      window.setTimeout( ()=> {
        Toast.clear()
      },1000);
      this.localforage.getItem('addrs').then( addrs => {
        this.addrs = addrs;
      })
      if (this.$route.query.toaddr) {
        this.toAddr.value = this.$route.query.toaddr;
      }
    },

    onClickLeft() {
      this.$router.push({ path:'/main-index/wallet' });
    },
    
    selectAddr(param) {
      this.toAddr.value = param;
      this.openAddrs = false;
      this.checkToAddr();
    },

    checkToAddr() {
      if (this.toAddr.value == '') {
        this.toAddr.msg = this.$t('wallet.send.checkWarnMsg1');
        this.toAddr.status = false;
      } else if (!this.isAddress(this.toAddr.value)) {
        this.toAddr.msg = this.$t('wallet.send.checkWarnMsg2');
        this.toAddr.status = false;
      } else if (this.toAddr.value == this.walletDB.current) {
        this.toAddr.msg = this.$t('wallet.send.checkWarnMsg7');
        this.toAddr.status = false;
      } else {
        this.toAddr.msg = '';
        this.toAddr.status = true;
      }
    },

    checkCount() {
      if (!this.count.value && Number(this.count.value) == 0 ) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg3');
        this.count.status = false;
      } else if (Number(this.count.value) <= 0) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg3');
        this.count.status = false;
      } else if (Number(this.count.value) > this.walletDB.accounts[this.walletDB.current].availableBalance) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg4');
        this.count.status = false;
      } 
      else if (Number(this.count.value) < 0.000005) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg5');
        this.count.status = false;
      } else if (String(this.count.value).indexOf('.') >= 0 && String(this.count.value).split(".")[1].length > 8) {
        this.count.msg = this.$t('wallet.send.checkWarnMsg6');
        this.count.status = false;
      } else {
        this.count.msg = '';
        this.count.status = true;
      }
    },
    
    next() {
      this.checkToAddr();
      this.checkCount();
      if (this.toAddr.status && this.count.status) {
        this.$refs.myLBTC.toTXcontent();
      }
    },

    sendAll() {
      this.$refs.myLBTC.sendAll();
    },

    toQrCode() {
      this.$router.push({ path: "/qr" });
    },

    toAddrInfo() {
      this.$router.push({ path: "/mine-addrInfo" });
    }

  },
  destroyed(){},
  watch:{
    callBackObj(val) {
      if (val.type == 0) {
        this.count.msg = val.content;
        this.count.status = false;
      }
      if (val.type == 1) {
        this.count.value = val.content;
        this.count.status = true;
      }
    }
  },
}
</script>