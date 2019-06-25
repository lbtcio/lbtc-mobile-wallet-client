<style lang="scss" scoped>
#vote-register{
  .warn-button {
    color: #fff;
    background-color: #e51313;  
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
  .dialog-content-box {
    background-color: rgba(29, 90, 163, 0.11);
    padding: 20px 15px;
    letter-spacing: 0;
    margin: 10px 0;
    word-break: break-all;
  }
  .dialog-title {
    position: relative;
  }
  .dialog-cloes {
    position: absolute;
    right: 15px;
    top: 2px;
    height: 80%;
  }
}
</style>
<template>
  <div id="vote-register">
    <van-nav-bar :z-index="1000" :title="$t('vote.register.navTitle')" left-arrow fixed @click-left="$router.goBack()"/>

    <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="true" :callBack.sync="callBackObj">
      <div class="container fixed-container">
        <div class="input-with-label-group">
          <div class="input-with-label-item">
            <label for="fromAddr">
              {{$t('vote.register.addr')}}
            </label>
            <input type="text" id="fromAddr" v-model="walletDB.current" readonly />
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('vote.register.name')}}
            </label>
            <span class="addr-balance">
              {{$t('vote.register.balance')}}:{{walletDB.accounts[walletDB.current].availableBalance}} LBTC
            </span>
            <input type="text" id="value" :placeholder="$t('vote.register.namePlaceholder')" v-model.trim="name" @change="nameChange"/>
            <label for="value" class="error-msg" v-if="msg">{{msg}}</label>
          </div>
        </div>
        <div class="input-group" style="padding-top: 80px">
          <button class="default" @click="next">{{$t('vote.register.next')}}</button>
          <label class="error-msg">{{$t('vote.register.warnMsg')}}</label>
        </div>
      </div>
    </tx-component>

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
      targets: {},
      name: '',
      msg: '',
      status: false
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

    addrInfoInit() {},

    nameChange() {
      if (this.name == '') {
        this.msg = this.$t('commom.tx.notEmpty');
        this.status = false;
      } else if (new Buffer(this.name).length > 32) {
        this.msg = this.$t('commom.tx.tooLong32');
        this.status = false;
      } else {
        this.msg = '';
        this.status = true;
      }
    },

    next() {
      this.nameChange();
      if (this.status) {
        this.$set(this.targets, 'confirmTxType', this.$t('vote.register.confirmInfoTxType'));
        this.$set(this.targets, 'confirmTxName', this.$t('commom.tx.confirmInfoName'));
        this.$set(this.targets, 'confirmTxContent', this.name);
        this.$set(this.targets, 'OP_RETURN', this.LBTCtools.RegForgedNode(this.name));
        this.$set(this.targets, 'fee', this.wConfig.fees.regDelegate);
        this.$refs.myLBTC.toTXcontent();
      }
    }
  },
  destroyed(){},
  watch:{
    callBackObj(val) {
      if (val.type == 0) {
        this.msg = val.content;
        this.status = false;
      }
    }
  }
}
</script>