<style lang="scss" scoped>
#vote-index{
  .tx-item {
    padding: 15px 10px;
    .content {
      border-top: 1px solid #eee;
      display: flex;
      padding: 15px 5px;
      font-size: 12px;
      & > div {
        flex: 1;
      }
    }
  }
  .flex {
    display: flex;
    align-items: center;
    padding-bottom:15px;
    & > * {
      margin: 0 4px;
    }
  }
  .van-icon-arrow::before {
    -webkit-transition: .2s;
    transition: .2s;
  }
  .vote-arrow .van-icon-arrow::before {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .height {
    height: 0;
  }
}
</style>
<template>
  <div id="vote-index">
    <van-nav-bar :title="$t('vote.index.navTitle')" fixed left-arrow @click-left="onClickLeft" />

    <div class="container fixed-container">
      <div class="tx-item" style="display: block;padding-bottom: 0;">
        <div class="flex" @click="openVotesView">
          <div class="tx-type">
              <img src="http://lbtc.io/wallet/static/img/vote-1.png">
          </div>
          <div class="tx-info">
            <div class="tx-id">{{$t('vote.index.item1')}}</div>
          </div>
          <div class="tx-value" :class="showNum ? 'vote-arrow' : ''">
            <van-icon class="" name="arrow" />
          </div>
        </div>
        <div class="content" v-if="showNum" :class="">
          <div @click="toVoters">
            <span v-if="votersErrorType">{{$t('vote.index.item1Msg1')}} {{votersList.length}} {{$t('vote.index.votes')}}</span>
            <span v-if="!votersErrorType" style="color: #ed3f14">{{$t('vote.index.item1Msg3')}}</span>
          </div>
          <div @click="toVotes" style="text-align: right;">
            {{$t('vote.index.item1Msg2')}} {{votesList.length}} {{$t('vote.index.votes')}}
          </div>
        </div>
      </div>

      <div class="tx-item" @click="toRegister">
        <div class="tx-type">
            <img src="http://lbtc.io/wallet/static/img/vote-2.png">
        </div>
        <div class="tx-info">
          <div class="tx-id">{{$t('vote.index.item2')}}</div>
        </div>
      </div>

      <div class="tx-item" @click="toVote">
        <div class="tx-type">
            <img src="http://lbtc.io/wallet/static/img/vote-3.png">
        </div>
        <div class="tx-info">
          <div class="tx-id">{{$t('vote.index.item3')}}</div>
        </div>
        <div class="tx-value">
          {{$t('vote.index.item3Msg')}} {{countSum - votesList.length}} {{$t('vote.index.votes')}}
        </div>
      </div>

      <div class="tx-item" @click="toVotecancel">
        <div class="tx-type">
            <img src="http://lbtc.io/wallet/static/img/vote-4.png">
        </div>
        <div class="tx-info">
          <div class="tx-id">{{$t('vote.index.item4')}}</div>
        </div>
        <div class="tx-value">
          
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{
    
  },
  props:{},
  data(){
    return {
      showNum: false,
      current_wallet: '',
      forgeList: [],
      votersList: [],
      votesList: [],
      votersErrorType: 1,
      countSum: 51,
      name: ''
    }
  },
  computed:{
    
  },
  created(){
    this.hisInit();
  },
  mounted(){
    
  },
  methods:{
    hisInit() {
      this.localforage.getItem("current_wallet").then( res => {
        this.current_wallet = res;
        return Promise.resolve(res)
      }).then(res => {
        return Promise.resolve(
          Promise.all([this.$http.get(this.$api.api.getListDelegates, {addr: res}), this.$http.get(this.$api.api.getVoteByAddr, {param: res, addr: res})]).then( data => {
            if (data[0].error) {
              this.forgeList = [];
            } else {
              this.forgeList = data[0].msg;
            }
            if (data[1].error) {
              this.votesList = [];
            } else {
              this.votesList = data[1].msg;
            }
            let name = '';
            for (let i = 0; i < this.forgeList.length; i++) {
              if (this.forgeList[i].address == this.current_wallet) {
                name = this.forgeList[i].name;
                this.name = this.forgeList[i].name;
                break
              }
            }

            this.$http.get(this.$api.api.getVotersByAddr, {addr: res, name: name}).then( res => {
              if (res.error) {
                this.votersErrorType = 0;
              } else {
                this.votersErrorType = 1;
                this.votersList = res.msg;
              }
            })
            return Promise.resolve(true)
          })
        )
      }).then( status => {
        return true
      })
    },
    onClickLeft() {
      this.$router.back();
    },
    openVotesView() {
      this.showNum = !this.showNum
    },
    toRegister() {
      if (this.votersErrorType) {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.toastMsg1')
        });
      } else {
        this.$router.push({ path:'/vote-register' });
      }
    },
    toVoters() {
      if (this.votersErrorType) {
        if (this.votersList.length) {
          this.$router.push({ path:'/vote-voters',query: { voters: JSON.stringify(this.votersList), forgeList: JSON.stringify(this.forgeList)}});
        } else {
          Toast.fail({
            duration: 1500,
            message: this.$t('vote.index.toastMsg2')
          });
        }
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.item1Msg3')
        });
      }
    },
    toVotes() {
      if (this.votesList.length) {
        this.$router.push({ path:'/vote-votes',query: { votes: JSON.stringify(this.votesList)}});
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.toastMsg2')
        });
      }
    },
    toVote() {
        this.$store.commit('saveVoteData', {
          forgeList: this.forgeList,
          votesList: this.votesList
        });
        this.$router.push({ path:'/vote-vote'});
    },
    toVotecancel() {
        // this.$router.push({ path:'/vote-vote',query: { forgeList: JSON.stringify(this.forgeList)}});
      if (this.votesList.length) {
        this.$store.commit('saveVoteData', {
          forgeList: this.forgeList,
          votesList: this.votesList
        });
        this.$router.push({ path:'/vote-votecancel'});
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.toastMsg3')
        });
      }
    }
  },
  destroyed(){},
  watch:{

  },
}
</script>