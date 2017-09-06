<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index ) in goods" class="menu-item" :class="{current : currentIndex === index}" 
        @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span><span>{{item.name}}</span>
          </span>
        </li>
      </ul>
    </div> 
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div> 
  </div>
</template>

<script type='ecmascript-6'>
  import bscroll from 'better-scroll'
  export default{
    props: {
      seller: {
        type :Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: [],
        listHeight: [0],
        scrollY: 0
      }
    },
    created() {
      this.$ajax('./api/goods')
        .then((response) => {
          this.goods = response.data.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight();
          })
        })
      this.classMap = ["decrease","discount","special","invoice","guarantee"]
    },
    computed: {
      currentIndex() {
        for(let i = 0 ; i < this.listHeight.length; i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2 || this.scrollY>=height1 && this.scrollY <height2){
            return i;          
          }
        }  
        return 0
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new bscroll(this.$refs.menuWrapper,{
          click:true
        })
        this.foodScroll = new bscroll(this.$refs.foodsWrapper,{
          probeType:3
        });
        this.foodScroll.on("scroll",(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this. $refs.foodsWrapper.getElementsByClassName("foods-list");
        let height = 0;
        for(let i = 0 ; i<foodList.length; i++){
          let item = foodList[i]
          height +=item.clientHeight;
          this.listHeight.push(height)
        }
      },
      selectMenu(index) {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName("foods-list")
        let el = foodList[index]
        this.foodScroll.scrollToElement(el,300);
      }
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
  @import '../../common/scss/mixin.scss';
  .goods{
    display: flex;
    position: absolute;
    top:3.48rem;
    bottom: 0.92rem;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 1.6rem;
      width: 1.6rem;
      background-color: #f3f5f7;
      .menu-item{
        display: table;
        height: 1.08rem;
        width: 1.6rem;
        padding: 0 0.24rem;
        &.current{
          position: relative;
          z-index: 10;
          background-color: #fff;
          font-weight: 700;
        }
        .text{
          display: table-cell;
          line-height: 0.28rem;
          vertical-align: middle;
          width: 1.12rem;
          border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
          font-size: 0.24rem;
        }
        .icon{
          width: 0.24rem;
          height: 0.24rem;
          display: inline-block;
          vertical-align: top;
          margin-right: 0.08rem;
          &.decrease{
            @include icon-bg('decrease_3')
          }
          &.discount{
            @include icon-bg('./discount_3')
          }
          &.guarantee{
            @include icon-bg('./guarantee_3')
          }
          &.invoice{
            @include icon-bg('./invoice_3')
          }
          &.special{
            @include icon-bg('./special_3')
          }
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .foods-list{
        .title{
          font-size: 0.24rem;
          color: rgb(147, 153, 159);
          line-height: 0.52rem;
          background-color: #f3f5f7;
          border-left: 0.04rem solid #d9dde1;
          padding-left:0.28rem ;
        }
        .food-item{
          display: flex;
          margin:0.36rem;
          border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
          padding-bottom: 0.36rem;
          &:last-child{
            border-bottom: none;
          }
          .icon{
            width: 1.14rem;
            height: 1.14rem;
            flex: 0 0 1.14rem;
            margin-right:0.2rem ;
          }
          .content{
            flex: 1;
            .name{
              font-size: 0.28rem;
              color: rgb(7, 17, 27);
              line-height: 0.28rem;
              margin: 0.04rem 0 0.16rem;
            }
            .desc{
              font-size: 0.2rem;
              color: rgb(147, 153, 159);
              line-height: 0.2rem;
              margin-bottom: 0.16rem;
            }
            .extra{
              font-size: 0.2rem;
              color: rgb(147, 153, 159);
              line-height: 0.2rem;
              font-weight: 200;
              .count{
                margin-right: 0.24rem;
              }
            }
            .price{
              font-weight: 700;
              line-height: 0.48rem;
              font-size: 0.2rem;
              .now{
                margin-right: 0.36rem;
                color: rgb(240, 20, 20);
                font-weight: 700;
              }
              .old{
                text-decoration: line-through;
                font-size: 0.2rem;
                color: rgb(147, 153, 159);
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
</style>