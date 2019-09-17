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
  > .van-popup--bottom {
    max-height: 80%;
  }
  .drop {
    position: relative;
    background-color: #fff;
    flex: 1;
    font-size: 14px;
    border: none;
    word-break: keep-all;
    padding: 2px 25px 2px 10px;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    .arrow-down {
      width:0;
      height:0;
      overflow:hidden;
      font-size: 0; 
      line-height: 0; 
      border-width: 4px;
      border-style: solid;  
      border-color:#666 transparent transparent transparent;
      position: absolute;
      top: 50%;
      bottom: 0;
      right: 8px;
    }
    .drop-menu {
      position: absolute;
      padding: 5px 0;
      z-index: 999;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      border-width: 7px 7px 7px 0;
      border-right-color: hsla(0,0%,85%,.5);
      left: -1px;
      top: 35px;
      li {
        padding: 8px 25px 8px 12px;;
        text-align: left;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
<template>
  <div id="wallet-send" @click="closeAll">
    <van-nav-bar :z-index="1000" :title="$t('wallet.send.navTitle')" @click-left="onClickLeft" @click-right="toQrCode" left-arrow fixed>
      <img class="qr-code" v-if="isplusReady" slot="right" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABcklEQVRYR+3Xu0odURQG4M8LpLLwAkkhgYAWprGy0ioEQqwkaGz0DSL4Anb2gopvoIRA0piEWOsDKF4CKqgBFVTsBUVZcR8R5MDBgZlTzG5mz2av9f/7n7VnrdXgfnzAFHrQltZu8BVj6f25jyV8RlNycIkdTGOlAR/xu4r3Y3Q+FznZnaOjio/3QWAVA2nDPxyk+RVm8CcjgTjgJF4kP2/wOs3XgsAF2rGP7oxgtZrvJqyLIHCbrL5juFYPGfcF1qfArgsCp3iFeUxkPFmt5t8wgutQoB99iMWTWj1k3DeOWfwMAoWOkkCpQF0o0IJeNOd8Ha6xHgrsoStn8ArcVhDYxtuCCGwGgSI/wUZdBGFB6t/DlgqUCoQCixjElzTPIyijIJnDchCIBqQxVUSjeaAnrIeSrKyKK43J3xxzQiUB/m9MHrdmRzhMcRDp8gcWMsZFBPfQo3T/pDWLG/CrCsgZXmYkEN1waxUf7yo/osLa8zup8VDzDyqz/gAAAABJRU5ErkJggg==" />
    </van-nav-bar>

    <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="false" :callBack.sync="callBackObj">
      <div class="container fixed-container">
        <div class="input-with-label-group" style="height: 400px">
          
          <div class="input-with-label-item">
            <label for="value">
              {{$t('wallet.send.payMoney')}}
            </label>
            <span class="addr-balance" @click="sendAll()">
              {{$t('wallet.send.balance')}}:{{walletDB.accounts[walletDB.current].availableBalance}} LBTC
            </span>
            <input type="number" id="value" style="font-size: 20px;" :placeholder="$t('wallet.send.moneyInputPlaceholder')" v-model="count.value" @change="checkCount"/>
            <label for="value" class="error-msg" v-if="count.msg">{{count.msg}}</label>
          </div>

          <div class="input-with-label-item">
            <label for="fromAddr">
              {{$t('wallet.send.payAddr')}}
            </label>
            <input class="hash" type="text" id="fromAddr" v-model="walletDB.current" readonly />
          </div>

          <div class="input-with-label-item">
            <label for="toAccount">
              {{$t('wallet.send.payee')}}
            </label>
            <span class="addrs" @click="openAddrs = true">
              <van-icon name="pending-orders" />
            </span>
            <div class="flex">
              <button class="drop" type="button" @click.stop="selectSendStatus = !selectSendStatus">
                {{sendTypeActions[sendTypeIndex].name}}
                <i class="arrow-down"></i>
                <transition name="fade">
                  <div class="drop-menu" v-if="selectSendStatus">
                    <ul>
                      <li v-for="(item ,index) in sendTypeActions" :key="item + index" @click.stop="selectSendType(item)">{{item.name}}</li>
                    </ul>
                  </div>
                </transition>
              </button >
              <input class="hash" type="text" id="toAccount" :placeholder="sendTypeActions[sendTypeIndex].inputPlaceholder" v-model.trim="toAccount.value" @change="checktoAccount"/>
            </div>
            <label for="toAccount" class="error-msg" v-if="toAccount.msg">{{toAccount.msg}}</label>
          </div>

          <!-- Result Show -->
          <!-- If enter the address, the nickname is displayed -->
          <div class="input-with-label-item" v-if="toAddrShow">
            <label for="toAddr">
              {{$t('wallet.send.payeeAddress')}}
            </label>
            <input class="hash" type="text" id="toAddr" v-model="toAddr" readonly />
          </div>

          <!-- If enter the nickname, the address is displayed -->
          <div class="input-with-label-item" v-if="toNicknameShow">
            <label for="toNickname">
              {{$t('wallet.send.payeeNickname')}}
            </label>
            <input class="hash" type="text" id="toNickname" v-model="toNickname" readonly />
          </div>
          <!-- Result Show -->

        </div>
        <div class="input-group">
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
      selectSendStatus: false,
      sendTypeIndex: 0,
      sendTypeActions: [
        {
          index: 0,
          name: this.$t('wallet.send.address'),
          inputPlaceholder: this.$t('wallet.send.payeeAddressPlaceholder')
        },
        {
          index: 1,
          name: this.$t('wallet.send.nickname'),
          inputPlaceholder: this.$t('wallet.send.payeeNicknamePlaceholder')
        }
      ],
      toAccount: {
        value: '',
        msg: '',
        status: false
      },
      toAddr: '',
      toAddrShow: false,
      toNickname: '',
      toNicknameShow: false,
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
        address: this.toAddr,
        value: this.decimal(this.count.value || 0).mul(this.wConfig.point).toNumber(),
        nickname: this.toNickname
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
        this.toAccount.value = this.$route.query.toaddr;
        this.selectSendType(
          {
            index: 0,
            name: this.$t('wallet.send.address'),
            inputPlaceholder: this.$t('wallet.send.payeeAddressPlaceholder')
          }
        );
        this.checktoAccount();
      }
    },

    onClickLeft() {
      this.$router.push({ path:'/main-index/wallet' });
    },

    closeAll() {
      this.selectSendStatus = false;
    },

    selectSendType(n) {
      if (this.sendTypeIndex == n.index) {
        this.selectSendStatus = false;
        return
      }
      this.sendTypeIndex = n.index;
      this.checktoAccount();
      this.selectSendStatus = false;
    },
    
    async selectAddr(param) {
      this.toAccount.value = param;
      this.selectSendType(
        {
          index: 0,
          name: this.$t('wallet.send.address'),
          inputPlaceholder: this.$t('wallet.send.payeeAddressPlaceholder')
        }
      );
      this.openAddrs = false;
      await this.checktoAccount();
    },

    checktoAccount() {
      return new Promise((resolve) => {
        if (this.toAccount.value == '') {
          this.toAccount.msg = this.$t('wallet.send.cannotBeEmpty');
          this.toAccount.status = false;
          this.toAddr = '';
          this.toNickname = '';
          this.toAddrShow = false;
          this.toNicknameShow = false;
          resolve(true)
        } else if (this.sendTypeIndex == 0) {  //  to Address
          if (!this.isAddress(this.toAccount.value)) {
            this.toAccount.msg = this.$t('wallet.send.addressWrong');
            this.toAccount.status = false;
            this.toAddrShow = false;
            this.toNicknameShow = false;
            this.toAddr = '';
            resolve(true)
          } else if (this.toAccount.value == this.walletDB.current) {
            this.toAccount.msg = this.$t('wallet.send.diffAddress');
            this.toAccount.status = false;
            this.toAddrShow = false;
            this.toNicknameShow = false;
            this.toAddr = '';
            resolve(true)
          } else {
            this.toAccount.status = true;
            this.toAccount.msg = '';
            this.$http.get(this.$api.api.getUsername, { param: this.toAccount.value, isHide: 1 }).then( r => {
              if (r.error) {
                this.toNickname = '';
                this.toAddrShow = false;
                this.toNicknameShow = false;
              } else {
                this.toNickname = r.msg;
                this.toAddrShow = false;
                this.toNicknameShow = true;
              }
              this.toAddr = this.toAccount.value;
              resolve(true)
            }).catch( e => {
              this.toNickname = '';
              this.toAddr = this.toAccount.value;
              this.toAddrShow = false;
              this.toNicknameShow = false;
              resolve(true)
            })
          }
        }else if (this.sendTypeIndex == 1) {  // to Nickname
          this.toNickname = '';
          if (!this.isNickname(this.toAccount.value)) {
            this.toAccount.msg = this.$t('wallet.send.nicknameWrong');
            this.toAccount.status = false;
            this.toAddr = '';
            this.toAddrShow = false;
            this.toNicknameShow = false;
          } else {
            this.$http.get(this.$api.api.getAddress, { param: this.toAccount.value, isHide: 1 }).then( r => {
              if (r.error) {
                this.toAccount.msg = this.$t('wallet.send.nicknameWrong');
                this.toAccount.status = false;
                this.toAddr = '';
                this.toAddrShow = false;
                this.toNicknameShow = false;
              } else {
                this.toAccount.msg = '';
                this.toAccount.status = true;
                this.toNickname = this.toAccount.value;
                this.toAddr = r.msg;
                this.toAddrShow = true;
                this.toNicknameShow = false;
              }
              resolve(true)
            }).catch( e => {
              this.toAccount.msg = this.$t('wallet.send.nicknameWrong');
              this.toAccount.status = false;
              this.toAddr = '';
              this.toAddrShow = false;
              this.toNicknameShow = false;
              resolve(true)
            })
          }

        }
      
      })
    },

    checkCount() {
      if (!this.count.value && Number(this.count.value) == 0 ) {
        this.count.msg = this.$t('wallet.send.invalidAmount');
        this.count.status = false;
      } else if (Number(this.count.value) <= 0) {
        this.count.msg = this.$t('wallet.send.invalidAmount');
        this.count.status = false;
      } else if (Number(this.count.value) > this.walletDB.accounts[this.walletDB.current].availableBalance) {
        this.count.msg = this.$t('wallet.send.excessOfBalance');
        this.count.status = false;
      } else if (Number(this.count.value) < 0.000005) {
        this.count.msg = this.$t('wallet.send.amountTooSmall');
        this.count.status = false;
      } else if (String(this.count.value).indexOf('.') >= 0 && String(this.count.value).split(".")[1].length > 8) {
        this.count.msg = this.$t('wallet.send.more8decimal');
        this.count.status = false;
      } else {
        this.count.msg = '';
        this.count.status = true;
      }
    },
    
    async next() {
      await this.checktoAccount();
      this.checkCount();
      if (this.toAccount.status && this.count.status) {
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
      this.$router.push({ path: "/mine-addrInfo", query: { fromSend: true} });
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