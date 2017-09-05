<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support" >
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont">></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="background"><img :src="seller.avatar" alt=""></div>
    <!-- 弹出层-->
    <transition name="fade">
      <div class="detail" v-show="detailShow" >
        <!-- sticky footer 布局 -->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <!-- 打分组件 -->
            <div class="star-wrapper">
              <star :score="seller.score"></star>  
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail"><i class="iconfont icon-close"></i></div>
      </div>  
    </transition>
    
  </div>
</template>

<script type='ecmascript-6'>
  import star from '../star/star'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    components: {
      'star':star
    },
    created () {
      this.classMap = ["decrease","discount","special","invoice","guarantee"]
    }
  }
</script>

<style lang="scss">
  @import '../../common/scss/mixin.scss';
  .header{
    height: 2.68rem;
    color: #fff;
    position: relative;
    overflow: hidden;
    .content-wrapper{
      height: 100%;
      padding: 0.48rem 0 0 0.48rem;
      background-color: rgba(7,17,27,0.5);
      font-size: 0;
      position: relative;
      .avatar{
        width: 1.28rem;
        height: 1.28rem;
        display: inline-block;
        font-size: 0.24rem;
        margin-right: 0.32rem;
        vertical-align: top;
        border-radius: 0.02rem;
      }
      .content{
        display: inline-block;
        font-size: 0.24rem;
        .title{
          margin:0.04rem 0 0.16rem 0;
          font-size: 0;
          .brand{
            width: 0.6rem;
            height: 0.36rem;
            display: inline-block;
            vertical-align: top;
            @include icon-bg('brand')
          }
          .name{
            font-size: 0.32rem;
            font-weight: bold;
            line-height: 0.36rem;
            margin-left: 0.12rem;
          }
        }
        .description{
          line-height: 0.24rem;
          margin-bottom: 0.2rem;
        }
        .support{
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 0.24rem;
            height: 0.24rem;
            margin-right: 0.08rem;  
            &.decrease{
              @include icon-bg('decrease_2')
            }
            &.discount{
              @include icon-bg('discount_2')
            }
            &.guarantee{
              @include icon-bg('guarantee_2')
            }
            &.invoice{
              @include icon-bg('invoice_2')
            }
            &.special{
              @include icon-bg('special_2')
            }
          }
          .text{
            font-size: 0.2rem;
            line-height: 0.24rem;
          }
        }
      }
      .support-count{
        position: absolute;
        right: 0.24rem;
        bottom:0.92rem;
        height: 0.48rem;
        padding: 0 0.16rem;
        border-radius: 0.24rem;
        line-height: 0.48rem;
        text-align:center;
        background-color: rgba(0, 0, 0, 0.1);
        .count{
          font-size: 0.2rem;
          vertical-align: top;
          margin-right: 0.04rem;
        }
        .iconfont{
          font-size: 0.14rem;
        }
      }
    }
    .bulletin-wrapper{
      height: 0.56rem;
      width: 100%;
      padding: 0 0.44rem 0 0.24rem;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(7,17,27,0.2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 0.56rem;
      .bulletin-title{
        display: inline-block;
        width: 0.44rem;
        height: 0.24rem;
        @include icon-bg('bulletin');
        vertical-align: top;
        margin-top:0.16rem;
      }
      .bulletin-text{
        font-size: 0.2rem;
        margin-left: 0.04rem;
      }
    }
    .background{
      width: 100%;
      position: absolute;
      left: 0;
      top:0;
      z-index: -1;
      filter: blur(0.1rem)
    }
    .detail{
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7,17,27,0.8);
      backdrop-filter: blur(0.1rem);
      &.fade-enter-active, .fade-leave-active {
        transition: opacity .5s
      }
      &.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
        opacity: 0
      }
      .detail-wrapper{
        min-height: 100%;
        .detail-main{
          padding: 1.28rem 0;
          .name{
            font-size: 0.32rem;
            font-weight:700;
            line-height: 0.32rem;
            text-align:center;
          }
          .star-wrapper{
            margin-top: 0.36rem;
          }
          .title{
            width: 80%;
            margin:0.56rem auto 0.48rem;
            display: flex;
            .line{
              flex: 1;
              position: relative;
              top:-0.12rem;
              border-bottom:0.01rem solid rgba(#fff, 0.2)
            }
            .text{
              padding: 0 0.24rem;
              font-size: 0.28rem;
              font-weight: 700;
              // line-height: 0.32rem;
            }
          }
          .supports{
            width: 80%;
            margin:0 auto;
            .support-item{
              padding: 0 0.24rem;
              font-size: 0;
              margin-bottom: 0.24rem;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                vertical-align: top;
                width: 0.32rem;
                height: 0.32rem;
                margin-right: 0.12rem;  
                &.decrease{
                  @include icon-bg('decrease_2')
                }
                &.discount{
                  @include icon-bg('discount_2')
                }
                &.guarantee{
                  @include icon-bg('guarantee_2')
                }
                &.invoice{
                  @include icon-bg('invoice_2')
                }
                &.special{
                  @include icon-bg('special_2')
                }
              }
              .text{
                font-size: 0.24rem;
                line-height: 0.32rem;
              }
            }
          }
          .bulletin{
            width:80%;
            padding: 0 0.24rem;
            margin:0 auto;
            p{
              line-height: 0.48rem;
              font-size: 0.24rem;
              font-weight:200;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 0.64rem;
        height: 0.64rem;
        margin: -1.28rem auto 0 auto;
        text-align: center;
        .icon-close{
          font-size: 0.48rem;
          color: rgba(255, 255, 255, 0.5)
        }
      }
    }
  }

</style>