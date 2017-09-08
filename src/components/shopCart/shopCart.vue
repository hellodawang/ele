<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'active':totalCount>0}">
            <i class="iconfont icon-cart" :class="{'active':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active':totalCount>0}">￥ {{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>=minPrice}">{{payDesc}}</div>
    </div>
    <!-- 抛物线小球动画 -->
    <div class="ball-container" >
      <transition-group v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" v-on:enter="enter" >
        <div v-for="(ball,index) in balls" v-show="ball.show" class="ball" v-bind:key="index"></div> 
      </transition-group>
    </div>
  </div>
</template>

<script type='ecmascript-6'>
  export default{
    props :{
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type :Number
      },
      minPrice: {
        type :Number
      },
    },
    data() {
      return {
        balls: [
          {show:false},
          {show:false},
          {show:false},
        ],
        dropballs:[]
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price *food.count;
        })
        return total
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if(this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        }else if(this.totalPrice<this.minPrice){
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        }else{
          return '去结算'
        }
      }
    },
    methods: {
      drop(el) {
        for(let i = 0;i<this.balls.length; i++){
          let ball = this.balls[i];
          if(!ball.show){
            ball.show = true;
            ball.el = el;
            this.dropballs.push(ball);
            return
          }
        }
      },
      beforeEnter(el) {
        // 遍历所有的小球  找出show为true的小球
        // 方法里面的参数是执行当前动画的dom对象
        let count = this.balls.length;
        while(count--){
          let ball = this.balls[count];
          // 如果show为true 获得当前点击按钮的位置 计算偏移值
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - window.innerWidth*100*0.64/750;
            let y = - (window.innerHeight -rect.top -window.innerWidth*100*0.44/750);
            // el.style.display='';
            el.style.transform = `translate3d(${x}px,${y}px,0)` 
          }
        }
      },
      enter(el,done) {
        // 
        this.$nextTick(() => {
          el.style.transform = `translated3d(0,0,0)`;
          el.style.transition='all 1s cubic-bezier(.65,-0.71,.83,.67)'
          done()
        })
        
      },
      afterEnter(el) {
        let ball = this.dropballs.shift();
        if(ball){
          ball.show = false;
          el.style.display = 'none'
        }
      }
    }
   }
</script>

<style lang='scss' scoped='' type='text/css'>
  .shop-cart{
    position: fixed;
    left: 0;
    bottom:0;
    z-index: 50;
    width: 100%;
    height: 0.96rem;
    .content{
      display: flex;
      background-color: #141d27;
      font-size: 0;
      height: 100%;
      .content-left{
        flex: 1;
        height: 100%;
        .logo-wrapper{
          display: inline-block;
          position: relative;
          z-index: 51;
          top: -0.2rem;
          margin:0 0.24rem;
          padding: 0.12rem;
          width: 1.12rem;
          height: 1.12rem;
          background-color: #141d27;
          vertical-align: top;
          border-radius: 50%;
          .logo{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #2b343c;
            text-align: center;
            &.active{
              background-color: rgb(0, 160, 220);
            }
            .icon-cart{
              font-size: 0.5rem;
              line-height: 0.88rem;
              color: #80858a;
              &.active{
                color:#fff;
              }
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 0.48rem;
            height: 0.32rem;
            line-height: 0.32rem;
            text-align: center;
            font-size: 0.18rem;
            color: #fff;
            border-radius: 0.16rem;
            background-color: rgb(240, 20, 20);
            box-shadow: 0px 0.04rem 0.08rem 0 rgba(0, 0, 0, 0.4)
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          line-height: 0.48rem;
          margin-top: 0.24rem;
          padding-right: 0.24rem;
          border-right: 0.01rem solid rgba(255, 255, 255, 0.1);
          font-size:0.32rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          &.active{
            color: #fff;
          }
        }
        .desc{
          display: inline-block;
          padding-left: 0.24rem;
          font-size: 0.28rem;
          // font-wei/ght: 700;
          line-height: 0.48rem;
          color:rgba(255, 255, 255, 0.4);
          vertical-align: top;
          margin-top: 0.24rem;
        }
      }
      .content-right{
        flex: 0 0 2.1rem;
        width: 2.1rem;
        line-height: 0.96rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.24rem;
        text-align: center;
        background-color: #2b343c;
        &.enough{
          background-color: #00b43c;
          color: #fff
        }
      }
    }
    .ball-container{
      .ball{
        position: fixed;
        left: 0.64rem;
        bottom: 0.44rem;
        z-index: 200;
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        &.drop-enter-active{
          transition: all 1s cubic-bezier(.65,-0.71,.83,.67)  
        }
        &.drp-enter-to{
          transform: translate3d(0,0,0)
        }
      }
    }
  }
</style>