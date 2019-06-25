<style lang="scss" scoped>
#mine-index {
  .mine-header {
    padding: 30px 0 50px 0;
    background: linear-gradient(
      135deg,
      #3ca2e2 0,
      #499bd7 25%,
      rgba(54, 146, 212, 0.95) 25%,
      #3985c6 50%,
      #317dc0 50%,
      #3271b3 75%,
      rgba(28, 89, 162, 0.9) 75%,
      #1c59a2
    );
    position: relative;
    .mine-photo {
      height: 48px;
      width: 48px;
      margin: 0 auto;
      img {
        height: 100%;
      }
    }
    .mine-name {
      padding-top: 6px;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 20px;
      color: #fff;
      font-weight: 600;
      margin-bottom: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .mine-action {
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      background-color: #fff;
      margin: 0 42px;
      padding: 10px 0;
      border-radius: 3px;
      box-shadow: 0px 1px 9px 0px rgba(29, 90, 163, 0.45);
      font-size: 14px;
      a {
        color: #666;
      }
      img {
        height: 32px;
        margin-bottom: 2px;
      }
      .action-left {
        flex: 1;
      }
      .action-right {
        flex: 1;
      }
      .action-middle {
        height: 61px;
        width: 1px;
        border-color: #e5e5e5;
        background-color: #e5e5e5;
      }
    }
  }
  .cell-group {
    font-size: 14px;
    .cell-item {
      color: #666;
      display: flex;
      padding: 12px 15px;
      align-items: center;
      .cell-img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cell-content {
        flex: 1;
      }
      .cell-link {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
<template>
  <div id="mine-index" v-if="walletDB && walletDB.current">
    <div class="mine-header text-center">
      <div class="mine-photo">
        <img :src="'https://lbtc.io/wallet/static/img/photo/0/' + walletDB.accounts[walletDB.current].avatar + '.png'">
      </div>
      <div class="mine-name">{{walletDB.accounts[walletDB.current].name}}</div>
      <div class="mine-action">
        <div class="action-left">
          <router-link to="/mine-manage">
            <img src="https://lbtc.io/wallet/static/img/mine-manager-0.png">
            <div>{{$t('mine.index.manager')}}</div>
          </router-link>
        </div>

        <div class="action-middle"></div>

        <div class="action-right">
          <router-link :to="{path: '/wallet-coin-history', query: { coin: 'LBTC'}}">
            <img src="https://lbtc.io/wallet/static/img/mine-his-0.png">
            <div>{{$t('mine.index.his')}}</div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="mine-content container" style="margin-top: 60px;">
      <div class="cell-group">
        <router-link to="/mine-addrs">
          <div class="cell-item underline">
            <img
              class="cell-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACKElEQVRYR+1W0W3bMBC9k2H/1p2g6QRNJmg8QdsNFMAk/Nd0kqZ/xtFAlAmqTBBng2wQd4PmV4Z5xQliocRkSDkKjADmnyTq7t27x3dE2PPCPeeHA4C3xUCe5+PRaPQdAHIAOGr0U1prfy0Wi+UuekpmYDabHW02m9+IeBxI9IOILtrflFJLRPzcfsfMS2PMxL1LBqC1vgOAT8x8zcwXUrEwMhwOvyKiJH4HAN+IqHTBAwBujTGnnQAopXJEvGTmRz+7INPp9DTLshsAWBHRxy6tSGJAKVUi4hcA2KLZJdNa/xUWmPnEGCNsJa1UAHUvrbWTkNgc3e09vWnAF/xpeR0A7KSBnRhI6cGrtqBPALUImfnMGFP4AiulVoj4oaqq90VRiCChNw1orc8B4CcAXBGRuOCjJSZlrb1n5j/GGOeQIQDdNdBY8Koxm5yIrhyCxiEvEVHMJXhMQ+1I0kBD5zEiit/LWReK5ayPW9bsZSemgyiApnrpv1QotjsOBBWGBFSZZdntfD6X5+jyAmglFQv+79sumlhyO/LTgSPfZOggYlFV1bUTpQ/NFgCllEy7m3alMoCkssFgsAxV1mjBsSS2Xa+mXZOQPfsA1MepqbJYr9flcxX4qnJTUu4Nwg4z3xljTpIY0FqzbCSiqD6iDQaAWLytJLEfUpK298TiHQD4GKgvFl2pjux/ICKvf/hOgSjX3fH6wPHAzOehIdaL0l+C8gBg7wz8AzYgWzBhYfIYAAAAAElFTkSuQmCC"
            >
            <div class="cell-content">{{$t('mine.index.addrs')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
        <router-link to="/mine-set">
          <div class="cell-item underline">
            <img
              class="cell-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD1ElEQVRYR9VXbU7bQBCdsSHiX+kJGk5AOEHDCVpO0CDhFf8IJwBOUPiHdpEIJ4CeoHCCpidoeoK2fx3sqZ47GzYbO8T9+NGVokj2frydee/NmKnlMMaMiOhd0zJrLbfZstVkbJxl2YSZvxPRXXRQF8BEZMc5N14VRCOALMt6zHxLRCNr7Rk2PDw87JZl+YWIjq215+EhOv9T+G4wGGx2Op0TEblpAlULAJsR0Udm3tRDJmVZ7jNzl5mvy7Lcvbq6uo9vaYypImOtHRhj3hLReyLqigie79aBWAAQHP41z/N+p9Ppi8g5M7/CRgDVlOcsy+4xj4iQAgD4rGvPRUTqQMwBiA8fjUZAThrKIRHhdxqH30dCbw2SviCiM2vtqfIG6RyJCMDNRWIGoOnwVcnk5wHsxsbG5uXl5SRcq5e4Bwhm3rfWViSeATDG4HbI2QLB2oJomq8gvonIV+ccVPMEQEMFYm2naboT3+BvgDDGICUnRLS3EIFAZmMR+eSc2206VOV4JCJQix930+n0xvMmXutlKiIfnHMgaDXqVADGH4UoI7379yQiD9Umv+S6rXI7ds6BiHNDFdLL87wbguSDg4N+kiSvRaTPzH1d9SOeiOeBDd/keT4MN9KogFgAsh+C0NyDlMg/DOzBewIbY6BPDGgWHBinaXofc0CBfhSRC+ccCFs7jDFI4avpdLoVAkT+RWSgPlGtxXkewEyzTRtnWYbb9Tx7n+FHrV17nhVFgUgDzOuVASBSz93eg9IofHfO+ZQu4PWKaAUgdLemCOA5CIf//wfAKqHVsIpzbmfZ7VUtlc692dTNj1PwxEpmVLKHeHGWZSDN9Z9YNeS4vr6+DbmLyFtm7rEWITha9QMziWhird2KkSMKqvOhc+7iuUiE7/1a/wz1AJJfcEKd2K0zIl/RFMSYmX1btqlGBjnHrRoMDCm5hXOKyOnj4+PYe8QcgKAizopF3S01HTCj7eBGH9ArNLVeTQY1AwArLYoCPd3nZfJpE/ZwbtAzomXb8+/ChuQO5EiSpPcvSrGqoyrHYa0IG5Kq348Lye/eeEnqrkPZxxyoBaHpgQQxUG5r+37lxpuyLC/irjmspOiaF1IQ+Lj/8jm31h5rFTtiZoB9scy0gsqK7e6SJDlGOpsOx6Ta7wK/wLfh6GLSNB0WRVF1vHVu6Ms1Ghn1lKG24pAritJNePPGCESRgH4HXtvePvM8fxm3XvE7TRu6pzdNhzdGwIOA8YQHBU0JPCDmARi+FfcLkN+yb8XWH6dRnufIHjecqyioNQDcSET8N+PcGWtra5O2HvITDn67Mj8eNMwAAAAASUVORK5CYII="
            >
            <div class="cell-content">{{$t('mine.index.set')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
        <router-link to="/mine-help">
          <div class="cell-item underline">
            <img
              class="cell-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADXUlEQVRYR8VXS04bQRCtGgu2dk4AnCDkBDEnwJwAI9EjdoQT4JwgsEPdluKcIOYEmBNgToB9gsB2WriiN+oetYfp+awoyQurf69evfoM0ycbf/L71AnA+fn5MEmSYxE5ZOZ9IsKPRGRJRK9ENCeiR2MM/reyVgCUUmNmvvYPEtGziODBJTMPRCQHw8x7HpCIXE2n00UTiloASil4+heXi8iaiCa9Xm9xd3e3qrrY7R8R0Q8i6ovIwlp7MpvNALbSogDgNRH9YmYWkR/GmFmTN359PB4Pdnd3AQKsrUTkJBaWSgCO8t+O6nGXmIYgnWbmIiJEdFR1zwcAoJGIHph5nWXZsI6+Noy4sCxE5MVae1S+rwrACsJKkuQwFus0TUcicukzAbFGBhhjbqtAYT8RQUt/tNYIbWFbADz1InIWi3maptDCKRG9ufQjZgZrEN3SGPMtAiI/lyTJQejYFoA0TV+RXsaYPL/LFgBc93q9ob/IiQ4sfBWRW2MMBLhlFxcX+5vN5kVE7o0xYCS3AoATzEOd90qpBTN/J6ITrTWKTmH+Aahea31Qx0KWZV+8FgoASqkbZr4MF8uXgH4UHWPMMPIA1E5a68rsCrRQOBACgHcDrTXi2dkCBtexELpQ/SOin1rryVYIXPwhokrv6hAFqTuoCk94Nk1TlIVCBwUDWAiRtaWg9PiV1vqmAWzeH7yjWwBiCo5dCOG9v78/uYYUTd0SA0uXaTnToQbQYFZdQhDUhCKmTcw5pouCtCVCFJNYIYmoHl2uX5c54bkmEUKV1+VKVeeR8yaaduWzvpBtNpsjPyuEDKD3PxFRo5CaaI6tK6XmzDzUWiNbciv3Auigb609aNMFkfsYF4wxj02gfJ0oN6QtAMGmVqLqEgJXxg+zLNsPnatqx3m9D+MU864tgDRNc31V1ZkPAKDUnZ0dTLX92BTTRHe4HnRQTMsfqmxsJIMgMcUIM5+VO19bAIHnz7Hpqm4oRVOCavdEZGatvWojTIBz5RkD7VBEHq21o9jZ2rHcFQ7U9lP3HYABcz6dTu/LLLi9x0SEYQO/NyK68V0vxlrbDxOwMWFmPJCb/zDJc5k5jC0enidJMonNlCGYVgD8ASfQEYZREQkffWVmCHfZVS+dALQVX5d9nw7gPwTtFz8zVlMuAAAAAElFTkSuQmCC"
            >
            <div class="cell-content">{{$t('mine.index.help')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
        <router-link to="/mine-about">
          <div class="cell-item underline">
            <img
              class="cell-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC70lEQVRYR81X3W0aQRCeAcGrSQUxHcQVGCqIXUHOErfiLbgCQwVx3tAukkkFhgqMK4hdAXSQ5PVW3ERzmkXLHfebB7IvSDC7+82338x8IJx54Znvh1oAwjD8BADXAHDDwBFxwJ9EtJFEVgDwaox5q5pYJQCj0WjQarWeAODSP5iIXgUIg/LXLo7ju8Vi4YDl4ikEEARBr9PpPLtMAeAHAKyiKNosl8vf/qkSeyOxXxwz1trbdKy/LxeA0P2CiD0iWrfb7cl8Pt9VoXY8Hl/u9/tHRPxMRAx0mPcsJwHw5Yj4U7K4M8Ysq1ycjgnDMEDEpyIQGQBC5ZYzB4BbrTULK7M4rtvtJodba+/zaFZKsWCfJa6fjssACMNwg4jXRFSYuVKKWUnemrWhtQ7yWPKY2BhjhrkaELW/8JsbY5JSy1t1APAZLrE4jod+dRwxEIbhDhE/tlqtfpng5Ake+fAoiiZFSucYFmYcx1vuGT4LBwBeQGn2TQQpLKy4MvwEDwCUUhMA+Fb29v7lvIeIyBjzvQoopwUAuNdaJ+wdALg3iqLoQxmdkg3X+Ve5eKa1npaBkGf7xR3UGJO08QwArXWl9uwAS684HFgGQinFpGUBKKW4Y+201jxwStc/AOBBdaG17h8xwACIaGuMuSq93SurugxwpfEeY0wy2P6fJ2ggwqRj1mHAE+Gh1BuXYRMNFJZh3UbUEEB+I/L7NRFdldmqugC8OXNUskc17wVlpla6MuoCqDSMfBYAoLC71ZmGSinukg+npmyeIXnjqVg0F8S4JO3XWjvNa9+e8N6jKBqUGhJhgS0ZO9oLAJhqrWdVmlM6xmUOAH+IaHBKV2WmlFXLTGyIaFbFZjMI1hIiPohDfieioJYpdZkIzUue4fLdisG02+112rCIE+Y4Z835D8vaWhs0suU+nZLR1HU+95u4Xf6HxAb2sHjaEdG0CmOVRq87WbLkOc5+secuFiA8TVfW2lUVP+HOrAWgiRDL9pwdwF98YzY/6pIYdQAAAABJRU5ErkJggg=="
            >
            <div class="cell-content">{{$t('mine.index.about')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>