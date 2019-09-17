<style lang="scss" scoped>
#register-index{
  & > .container {
    height: 100vh;
  }
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
  <div id="register-index">
    <van-nav-bar :z-index="1000" :title="$t('register.navTitle')" left-arrow fixed @click-left="$router.goBack()"/>

    <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="true" :callBack.sync="callBackObj">
      <div class="container fixed-container">
        <div class="input-with-label-group">
          <div class="input-with-label-item">
            <label for="fromAddr">
              {{$t('register.addr')}}
            </label>
            <input class="hash" type="text" id="fromAddr" v-model="walletDB.current" readonly />
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('register.nickname')}}
            </label>
            <span class="addr-balance">
              {{$t('vote.register.balance')}}:{{walletDB.accounts[walletDB.current].availableBalance}} LBTC
            </span>
            <input type="text" id="value" :placeholder="$t('register.nicknamePlaceholder')" v-model.trim="nickname.value" @change="nameChange" :readonly="nickname.isReg"/>
            <label for="value" class="error-msg" v-if="nickname.msg">{{nickname.msg}}</label>
          </div>
        </div>
        <div class="input-group" style="padding-top: 80px">
          <button class="default" @click="next" :disabled="nickname.isReg" :class="{'disabled': nickname.isReg}">
            <span v-if="nickname.isReg">{{$t('register.registered')}}</span>
            <span v-else>{{$t('register.register')}}</span>
          </button>
          <label class="error-msg">{{$t('register.warnMsg')}}</label>
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

      nickname: {
        value: '',
        msg: '',
        status: false,
        isReg: false
      },
    }
  },
  computed:{},
  
  created(){},
  mounted(){
    this.addrInfoInit();

  },
  methods:{
    addrInfoInit() {
      this.$http.get(this.$api.api.getUsername, { param: this.walletDB.current, isHide: 1 }).then( r => {
        if (!r.error) {
          this.nickname.value = r.msg;
          this.nickname.isReg = true;
        } else {
          this.nickname.value = '';
        }
      }).catch( e => {
        this.nickname.value = '';
      })
    },

    nameChange() {
      return new Promise((resolve) => {
        if (this.nickname.value == '') {
          this.nickname.msg = this.$t('commom.tx.notEmpty');
          this.nickname.status = false;
          resolve(true)
        } else if (this.isNickname(this.nickname.value)) {
          this.$http.get(this.$api.api.getAddress, { param: this.nickname.value, isHide: 1 }).then( r => {
            if (r.error) {
              this.nickname.msg = '';
              this.nickname.status = true;
            } else {
              this.nickname.msg = this.$t('register.occupied');
              this.nickname.status = false;
            }
            resolve(true)
          })
        } else {
          this.nickname.msg = this.$t('register.nicknameRole');
          this.nickname.status = false;
          resolve(true)
        }
      })
    },

    async next() {
      await this.nameChange();
      if (this.nickname.status) {
        this.$set(this.targets, 'confirmTxType', this.$t('register.confirmInfoTxType'));
        this.$set(this.targets, 'confirmTxName', this.$t('commom.tx.confirmNickname'));
        this.$set(this.targets, 'confirmTxContent', this.nickname.value);
        this.$set(this.targets, 'OP_RETURN', this.LBTCtools.RegNickname(this.nickname.value, ''));
        this.$set(this.targets, 'fee', this.wConfig.fees.regNickname);
        this.$refs.myLBTC.toTXcontent();
      }
    }

  },
  destroyed(){},
  watch:{
    callBackObj(val) {
      if (val.type == 0) {
        this.nickname.msg = val.content;
        this.nickname.status = false;
      }
    }
  }
}
</script>