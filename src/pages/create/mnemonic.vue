<style lang="scss" scoped>
  #create-mnemonic {
    .dialog-button {
      color: #fff;
      background-color: #e51313;
    }
    .show-mnemonic {
      background-color: rgba(29, 90, 163, 0.11);
      padding: 20px 15px;
      letter-spacing: 1px;
      -webkit-user-select: text;
      user-select: text;
    }
    .show-mnemonic-click {
      padding: 10px 15px;
      letter-spacing: 1px;
      span {
        padding: 2px 4px;
        margin: 4px 2px;
        display: inline-block;
        border-radius: 2px;
        transition: all 0.4s;
      }
    }
    .show-mnemonic-click1 {
      background-color: rgba(29, 90, 163, 0.11);
      min-height: 80px;
      span {
        background: #fff;
        border-color: #fff;
      }
    }
    .show-mnemonic-click2 {
      span {
        background: #eee;
        border-color: #eee;
      }
    }
    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
    .list-complete-leave-active {
        position: absolute;
    }
    
  }
</style>
<template>
  <div id="create-mnemonic">
    <van-nav-bar :z-index="1000" 
      :title="$t('create.mnemonic.navTitle')"
      left-arrow
      @click-left="$router.goBack()"
    />

    <div class="container">
      <div class="input-group" v-if="next">
        <div class="text-center">
          <img class="msg-icon" src="https://lbtc.io/wallet/static/img/safe@2x.png" alt="">
          <h3>{{$t('create.mnemonic.title1')}}</h3>
        </div>
        <p>{{$t('create.mnemonic.content1')}}</p>
        <div class="show-mnemonic">
          {{mnemonic}}
        </div>
        <button class="default" @click="nextF">{{$t('create.mnemonic.next')}}</button>
      </div>

      <div class="input-group" v-if="!next">
        <div class="text-center">
          <h3>{{$t('create.mnemonic.title2')}}</h3>
        </div>
        <p>{{$t('create.mnemonic.content2')}}</p>
        <div class="show-mnemonic-click show-mnemonic-click1">
          <transition-group name="list-complete" tag="div">
            <span @click="click1(item, index)" v-for="(item, index) in arr1" :key="item">{{item}}</span>
          </transition-group>
        </div>
        <div class="show-mnemonic-click show-mnemonic-click2">
          <transition-group name="list-complete" tag="div">
            <span @click="click2(item, index)" v-for="(item, index) in arr2" :key="item">{{item}}</span>
          </transition-group>
        </div>
        <button class="default" @click="confirmMnem">{{$t('create.mnemonic.button')}}</button>
      </div>

    </div>

    <van-dialog
      v-model="openWarnDialog"
      :confirm-button-text="$t('create.mnemonic.dialogButton')" 
      :show-confirm-button="deFalse" 
      >
      <div class="dialog-msg-icon text-center" style="margin-top: 28px;">
        <img class="msg-icon" src="https://lbtc.io/wallet/static/img/noscreenshot@2x.png" alt="">
      </div>
      <div class="dialog-title">{{$t('create.mnemonic.dialogTitle')}}</div class>
      <div class="dialog-content">
        {{$t('create.mnemonic.dialogContent')}}
      </div>
      <div class="dialog-button text-center" @click="openWarnDialog = false">
        {{$t('create.mnemonic.dialogButton')}}
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components: {},
  props: {},
  data() {
    return {
      deFalse: false,
      openWarnDialog: true,
      next: true,
      clickStatus: true,
      wallet_info: {},
      mnemonic: '',
      arr1: [],
      arr2: [],
    };
  },
  computed: {},
  created() {
    if (this.$route.query && this.$route.query.wallet_info) {
      this.wallet_info = JSON.parse(this.$route.query.wallet_info);
    } else {
      this.$router.back();
    }
    this.mnemonic = this.wallet_info.mnemonicWord;
    this.arr2 = this.mnemonic.split(" ");
    this.arr2 = this.randArr(this.arr2);
    this.localforage.getItem('wallet_list').then( list => {
      if (list) {
        this.wallet_list = list
      }
    })
  },
  mounted() {},
  methods: {
    onClickRight() {
      return
    },
    nextF() {
      this.next = false;
    },
    click1(item, index) {
      if (this.clickStatus) {
        this.clickStatus = false;
        this.arr1.splice(index, 1);
        this.arr2.push(item);
        this.arr2 = this.randArr(this.arr2);
        window.setTimeout( ()=> {
          this.clickStatus = true;
        },600)
      }
    },
    click2(item, index) {
      if (this.clickStatus) {
        this.clickStatus = false;
        this.arr2.splice(index, 1);
        this.arr1.push(item);
        this.arr2 = this.randArr(this.arr2);
        window.setTimeout( ()=> {
          this.clickStatus = true;
        },600)
      }
    },
    confirmMnem() {
      if (this.mnemonic == this.arr1.join(" ")) {
        this.walletDB.accounts[this.wallet_info.address].backupFlag = true;
        this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then( r=> {
          Toast.success({
            duration: 1000,
            message: this.$t('create.mnemonic.msg1')
          });
          setTimeout(() => {
            if (this.$route.query.from == 'manageInfo') {
              this.$router.back();
            } else {
              this.$router.push({ path: "/main-index/wallet" });
            }
          },400)
        })
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t('create.mnemonic.msg2')
        })
      }
    }
  }
};
</script>