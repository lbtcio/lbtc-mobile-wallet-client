<style lang="scss" scoped>
#wallet-index {
  .wallet-header {
    color: #fff;
    height: 230px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: linear-gradient(135deg, #1c59a2 0, rgba(28,89,162, 0.9) 25%, #3271b3 25%, #317dc0 50%,#3985c6 50%, rgba(54,146,212, 0.95) 75%, #499bd7 75%, #3ca2e2);
    .top-button {
      display: flex;
      align-items: center;
      .drawer {
        display: flex;
        align-items: center;
        height: 50px;
      }
      .wap-nav {
        position: relative;
        height: 2px;
        width: 10px;
        margin-right: 5px;
        background-color: #fff;
        border-radius: 1px;
        &::after {
          content: '';
          position: absolute;
          height: 2px;
          width: 80%;
          background-color: #fff;
          top: -4px;
          left: 0;
          border-radius: 1px;
        }
        &::before {
          content: '';
          position: absolute;
          height: 2px;
          width: 120%;
          background-color: #fff;
          bottom: -4px;
          left: 0;
          border-radius: 1px;
        }
      }
      .name {
        font-size: 14px;
      }
      .flex-space {
        flex: 1;
      }
      img {
        width: 20px;
        height: 20px;
        margin: 10px 5px;
      }
    }
    .middle-balance {
      padding: 20px 0;
      .title {
        font-size: 16px;
        margin-bottom: 16px;
      }
      .balance {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .bottom-entrance {
      display: flex;
      padding: 10px 0;
      .bottom-entrance-item {
        flex: 1;
        font-size: 14px;
        img {
          height: 24px;
          width: auto;
        }
      }
    }
  }
  .backup {
    font-size: 12px;
    padding: 2px 4px;
    background-color: #e64545;
    color: #fff;
    border-radius: 3px;
  }
  .wallet-index-fixed {
    height: calc(100vh - 230px);
    margin-top: 230px;
    padding-bottom: 50px;
    z-index: 0;
    background-color: #fff;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .my-coin {
    height: calc(100vh - 300px);
    color: #1d5aa3;
    a {
      color: #1d5aa3;
    }
    .label {
      font-size: 12px;
      color: #999;
    }
    .top-title {
      padding: 6px 0;
      .add-coin {
        font-size: 20px;
        float: right;
      }
    }
  }
  .van-popup--left {
    height: 100vh;
    width: 60vw;
    .wallet-list-title {
      padding: 15px 18px;
      font-weight: 600;
      font-size: 18px;
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      background-color: #fff;
      z-index: 2000;
    }
    .container {
      padding: 50px 0 130px 0;
      height: 100%;
      overflow-y: auto;
    }
    .wallet-list-item {
      display: flex;
      padding: 10px 18px;
      align-items: center;
      color: #666;
      .wallet-photo {
        flex: 0;
        height: 30px;
        margin-right: 5px;
        vertical-align: middle;
      }
      .wallet-name {
        flex: 1;
        font-size: 14px;
        .wallet-address {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .action {
      background-color: #eee;
    }
    .bottom-button {
      position: absolute;
      background-color: #fff;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px 0;
      border-top: 1px solid #eee;
      z-index: 2000;
    }
  }
}
</style>
<template>
  <div id="wallet-index" v-if="walletDB && walletDB.current">
    <div class="wallet-header">
      <div class="container">
        <div class="top-button">
          <div class="drawer" @click="showWalletList = true">
            <span class="wap-nav"></span>
            <span class="name">{{walletDB.accounts[walletDB.current].name}}</span>
          </div>
          <span class="flex-space"></span>
          <img class="avatar"  @click="toWalletInfo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACHUlEQVRYR9WX0VEcMRBEuyOADAwRYCIwRACOwL4IfERgiAAcgSECcATmIvA5AhMCF0G7mpKuFrHLSNoPClXt165mnmZmZ1pE55L0EcBO2r4hue4xxdZNkpYAvgHYK/Y+ALgi+aPFZjWApF0AvwH45K8tR+KY5GMNSBVAg/PssxqiFuAawJeaEw2+uSH5NdoTAkhyrv9Fhibe75N0bUyuGgAX3WUnwBnJq7kA9wA+dQL8Inn6lgArkkfvHuAcwPfOFFyQ9P5ZRejG86cT4DBq0eFfYMeSegoxzL9t1wK4F7i75eETBWTjlh31gGqAFAWnwpGIIOz8KAp9PkFVBPLHaSa4sUy15RsAy9pB1BSBYcwTiCOS/3FHZt3iuCsCUeJ73jelYJAKn/zDQJR44DyQXLVCVANI8mg9AfBqbwdw54ek6yFcIYAkO/Q0LCVYZNxR8TQ0UF8nlOSKt/6bs6wTz6YMTEZAUo8KmvJzTXIx9nIUoML5XwAWnVl4WrA6RS7MJogXACnntyNWXOGOigtsVPGm/uCaccGOiZjPZU08A0gGPPmGBWfH5yTdbKqXJP+qrqGDwSYXpifk9gAlQKn/wnkeEUkq9cQznVgCeOJl4gVJh3z2Sj3kZzLkln2YjW4BCvkdqtlWqiISW7k+BHDOfPUKlWyr8/y9JDcld1Nf3Z5qagiQcxVeJmYA5EvOtrbKFOzWCokZEB7jj1kt/QcfytMhQ6pwOgAAAABJRU5ErkJggg==">
          <img class="qr-code" @click="toQrCode" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABb0lEQVRYR+1X0U3DMBS8mwCYAJgANgAmgA2ACWCEsgFMQLsBTEC7QbpB2aCZ4NAFG1kRpU6dKnzEUhWlfe/5fD3b7wgAkm4APAC49HsyXkg+tr7r9CrpOdRO8+YAnkjOKcmTfmyoWpM87DRjK1jSGsDBhhpXBmA0FyFgCcAJHn5OSb4VAjC7dwDiQvw8CzUXBhARfpI8KZksN1fSCsCxF2kA+kFDtjWQW7NTXMr6vwAQ6ShWfC4Nkqyra8ebgfOw/Sy4KMDcWjvFhW0/bUS+U4Uek0YAIwPDMyApPZt71HdWqaXPgXgQZWX0HFQZQJXcTj3X31quYcB/gU/DIUY1vAiHWHY658jAyIC3ofv2WwD3pR1wrqBDQ/IKYJb2hO8k3ULvfbRbsrErjsZkRfJ07/x/e9F4AdZta+Yf/PEwsFmpMIPgLPJozey+ogNrrNlf5nRN8qiEla3m1MUDiEm4FVMnW2xWfrHnNQC3ABPb8y9RDLGjNd2FUwAAAABJRU5ErkJggg==">
        </div>
        <div class="middle-balance text-center">
          <div class="title">
            {{$t('wallet.index.myAssets')}}(LBTC)
            <span v-if="!walletDB.accounts[walletDB.current].backupFlag" class="backup" @click="toWalletInfo">{{$t('wallet.index.backup')}}</span>
          </div>
          <div class="balance" @click="toSend">{{availableBalance}}</div>
        </div>
        <div class="bottom-entrance">
          <div class="bottom-entrance-item text-center" @click="toSend">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA+dJREFUeAHtmz1oFFEQx+80IEGUgEYvhRYnFoJgKjsRwUIEERRJrAQrQcWA2NgKgq3ap0+hiYrRKApiqcYg2phSED/ixwU58ev8Dd6GcJlZ773bvbzbvYFhb+e9NzP///vYd/tRrNVqvYVC4RI6jPajWZfPAJxAR4rF4tciBFzm5HTWUSv4xiBgSAh4T2Eeer6Rg58Y1ggBtcaSHJ2XVuQIrAq1R7X+M37nMIv+iakTelGRBMvoajNRmQKKVLFtNRt1UAE4BtA5BaOYNlpTYJYV8nUH4TRTBcdbCqetChYBnTzsNawmHosAzUkmbV0CMtmtDqBSHwGstKnHcMC7pGpqyQG8Hx0j4jeO79AzS6KHYCAxTWZayQ2HJfSV4vhQK35925LHlJKLmMx9gG+sAk5LNH6AblOcHFFsy2pKdAr8B7wAnV9WtErwxAiQ4YR/q+cl9A/0ivwISRIhoA7+IcC0YS945b/3MNvSF3ISkrRMQJPghwB/PSTgUS4tEdDp4IUEbwKyAF4IiLshIuWqNAFe2p1HZ6hbVp0kZ/zC9Prk7Y4ENTE3QlSWHZ62ydH8tMv2iECbLBIoS3QjdJVA1mpv5ZC2fRcBRn2C+KwB+30CtaHNHnq61zWODwEfXIO0qX6FOHIj10l8CDhJBPMWk1P0ZCtfYDF0fsbhfBUgyCRDbR+5H0X7ksXg5U2e9Y2T102f1s4ESBCC3eMg2vHiMwU6HvRiAF0CFrORx9+5HwFeiyBXgR2MlsNoCO8VzJPHDRbmxz4j2JkAwB8g0DXUua1Pgk22OUteByHhVpP1F6r5TIGLtA4JvIARHKOQ4IzHuQGBNkvEAGU9OdnvARgJ+xAg9/5ClKdMAVkPnMSHgFNEeOIUJf3KckPkmE8Y57kMy2+YazsJtgXd4BPUsc0g9eVVvpVGuznse8nrpVEebwaMJuYdoXhvyZaS2CD6UUuwbpMyIShWqJPoHaHYYEkV1oHdx986w2fU88+N8qbMPmtAU45bqdQu8JJjcAS0E3xwBABettZ30VSHvQCPJLQRcILErCtLInM+Ah4dQyPA+nOVCnghITQCbkc9s+iYGvjgCGAzc4ekzqHVOgHPOO7G3tKlru5LP7DwaLKsGyES6kGthVAHEmPFl7kRct4Kx8RJrIge/4UzGfqpS2hrQOqAGwN0CWhkJG/n1giQLy2yJCYei4AyK+dAFhgAx1pwbLewxH01JndZptEQnwRbeBrt0vMCXt5e1aQUR4DWIGu27mdzsgbI8/U8ym9AV4SAiTyiB/MUO86qEDCCyocN8j5vHkR6fhI9LmAXro9cLlZx3ifGjEtFej7C+BdJ2LrxB2pdTQAAAABJRU5ErkJggg==">
            <div>{{$t('wallet.index.tabSend')}}</div>
          </div>
          <div class="bottom-entrance-item text-center" @click="toReceive">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABQFJREFUeAHtm0+oVHUUx9+8LAnjWaYgKvVMaJlIFGG6ewt1IyEhtCmFMIxaBMmzbQuhlasCC55LLUQX4kIiEF2oQST0H/QZiYUavSTDfOr4+c6bufzumXPnzp25V2du98D3ze+c3znnd865v7l/zn0zMhJQvV4fA5PgDJgBvdItDC+CKfBSsESmoWybPuRLPnsl5aKclNuYGwQTE+AKKIL24fQRd2FHKF0gmyJIOU7ElpUAzBaxWuDzMONabGGHkQ6QbpGkXOeKwEDbvqgjb5PY6eQcE2HwtjUqiFfOY6r2JBHsiUUxx1zkYxrU59hMfx9DezWYb6z+gF9Rq9XuGHmDJZaHGFwCS838f/DnwD9G3g2rXbcSjDvKu0dYVCcHSypKX4TDVeA36xj+5STHmnP05WNVkk23cnzoBGjpjApgz/Y66rkQvt+1K8JvS3LO3HZH/50k/axyfE8b/zOjOFloHOVWAPxeML7FPu7IWiIbi+R5xmN9LVQBLNWtoER8W25eAUqUb3oqVQHSa1RujWoHlPv4pmdX7YD0GpVbo9oB5T6+6dlVOyC9RuXWqHYAx3fWHGM1M/KiBY6jW46sJfLmPB8t/ayfNrdZ7YDLxstqnpn7bkA0fW4xvsXa9UIVb87zEdp0NW7mpC5VSJfVEptC8kYoZay21EfAPj8btURWR02Bv2o01ApbSkvsmpE3WGJZzEBtM7XGQvoC5hC4EQozjNUS2wVWGJv96gip936/6KAJoI0lkIP3KxjWmXtnwaCoHnyYyzWYp9syNgLpAOkWTfuipVlJLyKK7MUrobXRgikDdNUcLbIIyjX+ogaBzgc7we8gL7qNI23p1CNvayKbpq185EXKTTnWWutFg5aASZ2A9N14FnRqYLZMvE9dznRGP5l0wvOMPBnx6MS4HiwD8aPmGfiyGcS/gNNJ7yR8s0paVaCqQFWBqgLlrsDAXwbzLD+X1DX4ex6c4nL4U8y3bg7AwNwIxYLLgSG3beAuEOn/jTZEbmEG6lY4CizHATn+AEI6HrlHOjAPQ1FQOQ/I8c8we8bfaolRBrrtfTPn9Tx3TyJUjyGViGktOAG+Aa+nGvShMA/btxz7ohoiW0hocafnA+b1f3xHwRPNuKaQ/YjNWSfO/kU41z8hhnQTJpeWGH4+Dx03x690ihqddY7N+51supnDp/8VwFhPWSGdo9rnQ0EfY7WxLNn17Lz3xOfJrF1PvJqiDxvLXv4VzbiIWK+HV1gy0ar+oO6Jq/cCXlX+T7Kh3wGc3LaCY+AzsLzDwWu77ZeuLoNDSyQ8QfAHggReYGxffgTT7cNh3wGbTErPURT78sOoxNlhL8Cj8XQanCfTRHUVcIo1Muw7wMspk6wqQKZylVC52gElPKiZUvJ2gHvHlMnrYCq7eakAf5t4Vxq+H/YZx1gvKgeGVICfTTTj3E1NGllmFh9qqniNDL2lHRjSs8Bh8KKJaA8J7EA2Ddw7KKNv2U4/mzttlR8krwJ8DN4DS0wg4/BCnvQh3Sb3N4N5LpLF1ygBXcfgNXA7i2EPukew+aQLOy8OTyZXXjE9mXStjwbfuApQhC9R2AiuSrMA+hSfW1mnm6/T9+j+a2JI6ghb+RXsfjW2Ldbqft2aiD753ut3xJNAvya1P6hE1DXp1ZO6zVNA7x0yETabwQVwFXyQZMycXuftBX+B78C6DrpPMf8VuA6OgEXSvQcDUgd2EXUjIQAAAABJRU5ErkJggg==">
            <div>{{$t('wallet.index.tabReceive')}}</div>
          </div>
          <div class="bottom-entrance-item text-center" @click="toVote">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA5JJREFUeAHtWzFv1DAUviAQIARiQVwRUwXqwh9ghIWlzDDA0r1SfwB/AEZgRiAW1K0TqBICCQlGxIjoWKiEaBHHcAgEx/cdd6nJvXfnJHZiJ/ek17Of7ef3fXZiu0mSwWBwtNPp3IZeh56CNl2+AuAGdC1Jkm8JCLiLzGrTUQv41kHANRLwGYVtGPksB79gOE4CBtmSFuW7B1oEVoR6ULT+M/7Azxb0z5Q6oRclCHARekwNlJeAIH3YzquNIioAjgXoroCRptPaJbCFO+SHiHCqoQLHDgrfahU0AmKe9hJWFY9GgOSkkbY5AY0c1hyg5jMgB1mNrNqoGYB1/RCUmx9raQQBAL0IfQ7UfehHpFesGUBlSd5ZO6i5IoJfgn4SQFwah4ayTaGcJnUnOG4b9C8ALCHAF9AFIdBlwTZhivYSmAGeQL9MoBUMURJgAX4XWB8KeCdM0RFgAf47UF4dHYImAGcNURFgCf4KwL/JAtXy0RDgAzxJiYIAX+CjIMAn+OAJ8A0+aAKqAB8sAVWBD5KAKsGTgGnPBVg+FATFB6h8eHoO+grr7LNhgeM/I/Av4baruOYmJ9c6r/jZN6NTSdLTIAqPQF9nKj1A3ukSCn881e1k+jGzPWQu7kdun0I79TTYMXsw0iYBNw27mXyMjBMS4Ec70o77KwyeNMGJSoANgDMK1zdgf1SWBIKHH+1Iy67dT3t6HYkNAQxOk1Ik1A1+CApBSJJeAqyECnekSoYt9+WAtl6nvTli6Eu9BGbeA8aO4OSeAVhKWpOAxpWBHw1geQJGjkqTUDV4pwSUJaEO8M4JKEpCXeC9EJCXhDrBeyPAkoQnAL8M9bLDYww2gv7d3ASlzuB81o0RVVQptcOT4pFs6F0lwGYjJPlMbTgY8SXL+6nBPuF1h2cbRmkC2FEBEoIAz9idEJCThGDAOyXAkoSgwDsnYAYJwYH3QoBBwi2kfzIPeQ+9nOeJzbBVFX+UBeq/02DROOCb/006W7S9q3bTlkGr/wkWDQQjzveNt4u2r6Kds1WgimB99DEnwAerMfmcz4CYRstHrNoMyPWyoY/AHPtU8WgE8MVD6dUzx3H5dwccJ9DLBa2naV+N7aERv7RQPzbQnAZk58gTvPassTuNgIBweAtl/tkc7wH8lraN8hugeyRgo43ogXkTZ5U+CViDrkP5LW0bhCP/FLpCsOn6iOXiMPInaWy49DjyY4x/AX2kWJpqw5rmAAAAAElFTkSuQmCC">
            <div>{{$t('wallet.index.tabNode')}}</div>
          </div>
          <!-- <div class="bottom-entrance-item text-center" @click="toRegister">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAADH0lEQVR4Ae2bzWoUQRDHd1RcwS9Eg4oIEkRBAiI+gad9gYAQH0DQk1fxnOPizVMOIkbwJcSrJy8+QECS3XjRKIpiHH+Fu2GYVDvTmamd7ZluKHampuvj/+/qXrZnO0nTtN/r9VaRe8h5pAttDMiXyOMEAoZcPOoCagXjUAgY8aArI5/nYCwEpHltl+4PdQmshvWIpszoPnG9m7kP8fIwSS84E5cp4GgDp1FgD8A3cGBMe44H24FhLEwXnNsaVtcaEHrZa4T81pQuArS+rdRFAlo5rB6gYgV4kNXKrrECWjmsHqBiBXiQ1cqusQJaOaweoGIFeJDVyq6NVgA/T88gRZsypsQ3RgDAT4DsHfLMFGGRc22TAN1WkV3V58R4nom9UtVfkT2xNjPx9i5dO0KmBBB9ZS+Dfxdf+bhWBKLKc/zPBwEksoh8QfLtPYpjVUD+zxbfKgEzXQNIQha8deSUkuxNdE8Vva0qPwyTe5MpgO9VR7ys+q4FYgKoFTCzNYAE7iC7WaSO6x30V+smAZ8qATOZAgQ/C6AXSJl4J+n3Gpt+3SRo/sokpNn56tYwuORhdIu+8tbavsG01mpbA3D+QAtQUrdcFwPEU6eA6RpA0CXkR0mwWrfPKBfrIAE/KgFmU4CA8p3+Cqny3X4ae1kPjtZBgubDjACCPUSWtKCeutv0v+9po3VPVCXsan+QGCVJclEzKKvDraziFxz9P6A/nnv2nfsbOd30dot8fk1vDvJJPpvY7cNk9lOUhH8ScENL1kH6H2zU/pqPunSWU6CuHE39RAJM6Q3AeayAAAbJNMVYAab0BuA8VkAAg2SaYqwAU3oDcB4rIIBBMk0xVoApvQE4jxUQwCCZphgrwEGvHDNpW1O3/1wVsMC+3aAtDEywqOeGio7NyaEp9aRFRXJktzi/Tf2NTVF5L3igBkg5+/gWyb96l5FXwUsgtSzkwaQ5Dacd5ujzCrlc983HNQV8/dTR/2MdTnx9CAFykHge2psGkhgLAfKXlaabjP6TBpJYl7fDfWSIjJBZtw0CriHnqoLHx2VE+/MV6n1NsArm/l9V0vIH4AI6SAAAAABJRU5ErkJggg==">
            <div>{{$t('wallet.index.tabRegister')}}</div>
          </div> -->
        </div>
      </div>
    </div>

    <div class="wallet-index-fixed">
      <mt-loadmore
        style="overflow: visible;"
        :top-method="refresh"
        :auto-fill="false"
        :topPullText="$t('main.refresh')"
        :topDropText="$t('main.refresh')"
        :topLoadingText="$t('main.loading')"
        ref="loadmore">
        <div class="my-coin container">
          <div class="top-title">
            <span>{{$t('wallet.index.assets')}}</span>
          </div>
          <div class="cell-group">
            <router-link :to="{path: '/wallet-coin-history', query: { coin: 'LBTC'}}">
              <div class="cell-item underline">
                <img class="cell-logo" src="https://lbtc.io/wallet/static/img/coin-lbtc.png">
                <div class="cell-content">
                  <div class="title">LBTC</div>
                  <div class="label">Lightning Bitcoin</div>
                </div>
                <div class="cell-function">{{availableBalance}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
    </div>

    <!-- Wallet List -->
    <van-popup v-model="showWalletList" position="left">
      <div class="wallet-list-title">{{$t('wallet.index.walletListTitle')}}</div>
      <div class="container">
        <div class="wallet-list-item" :class="item == walletDB.current ? 'action' : ''" v-for="(item, index) in walletDB.addresses" :key="item" @click="selectWallet(item)">
          <img class="wallet-photo" :src="'https://lbtc.io/wallet/static/img/photo/0/' + walletDB.accounts[item].avatar + '.png'">
          <div class="wallet-name ellipsis">
            <div>{{walletDB.accounts[item].name}}</div>
            <div class="wallet-address hash">{{walletDB.accounts[item].address | formatHash}}</div>
          </div>
        </div>
      </div>

      <div class="bottom-button">
        <div class="wallet-list-item" @click="toImport">
          <img class="wallet-photo" style="height: 24px;" :src="'https://lbtc.io/wallet/static/img/wallet-index-inport.png'">
          <div class="wallet-name ellipsis">{{$t('create.index.importWallet')}}</div>
        </div>
        <div class="wallet-list-item" @click="toCreate">
          <img class="wallet-photo" style="height: 24px;" :src="'https://lbtc.io/wallet/static/img/wallet-index-create.png'">
          <div class="wallet-name ellipsis">{{$t('create.index.createWallet')}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      showWalletList: false,
      availableBalance: 0
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.walletIndexInit();
  },
  methods: {
    walletIndexInit() {
      if (this.$store.state.isFreshWallet) {
        this.$store.commit('isFreshWallet', false);
        window.setTimeout(() => {
          this.refresh();
        }, 500)
      }
    },

    refresh() {
      if (this.walletDB.updataStatus) {
        // await this.$store.dispatch('checkSync',this.walletDB.current)
        this.$store.commit('setUpdataStatus', false);
        this.$store.dispatch('getWalletTxs', {
          address: this.walletDB.current
        }).then( data=> {
          this.lbtcWalletDB.insertHistroy(this.walletDB.current, data);
          this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then(r => {
            if (data.currentHistory.length) {
              Toast({
                duration: 2000,
                message: this.$t('mine.txHis.msg2')
              });
            } else {
              Toast({
                duration: 2000,
                message: this.$t('mine.txHis.msg3')
              });
            }
            this.$store.commit('setUpdataStatus', true);
            this.$refs.loadmore.onTopLoaded();
          })
        }).catch((error) => {
          Toast({
            duration: 2000,
            message: error
          });
          this.$store.commit('setUpdataStatus', true);
          this.$refs.loadmore.onTopLoaded();
        })
      } else {
        this.$refs.loadmore.onTopLoaded();
      }
    },

    selectWallet(param) {
      if (param != this.walletDB.current && this.walletDB.updataStatus) {
        this.lbtcWalletDB.selectWallet(param);
        this.showWalletList = false;
        this.$store.dispatch('saveWalletDB', this.lbtcWalletDB).then( r => {
          this.refresh();
        });
      }
    },

    toSend() {
      this.$router.push({ path: "/wallet-send" });
    },

    toReceive() {
      this.$router.push({ path: "/wallet-receive" });
    },

    toVote() {
      this.$router.push({ path: "/vote-index" });
    },

    toGovernance() {
      this.$router.push({ path: "/governance-index" });
    },

    toRegister() {
      this.$router.push({ path: "/register-index" });
    },

    toToken() {
      this.$router.push({ path: "/token-index" });
    },

    toCreate() {
      this.$router.push({ path: "/create-create" });
    },

    toImport() {
      this.$router.push({ path: "/import-index" });
    },

    toHisInfo(param) {
      this.$router.push({
        path: "/mine-tx-hisInfo",
        query: { txInfo: JSON.stringify(param) }
      });
    },

    toWalletInfo() {
      this.$router.push({
        path: "/mine-manageInfo",
        query: { addr: this.lbtcWalletDB.current }
      });
    },

    toAddCoin() {
      this.$router.push({ path: "/wallet-add" });
    },

    toQrCode() {
      this.$router.push({ path: "/qr" });
    },
  },
  watch: {
    walletDB: {
      handler(newVal, oldVal) {
        this.availableBalance = newVal.accounts[newVal.current].availableBalance;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>