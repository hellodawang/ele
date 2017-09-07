<template>
  <div class="cart-control">
    <transition name="slide">
      <div class="cart-decrease" v-show="food.count>0" @click="descrease">
        <i class="iconfont icon-remove"></i>
      </div>  
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="add">
      <i class="iconfont icon-add"></i>
    </div>
  </div>
</template>

<script type='ecmascript-6'>
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add() {
        if(!this.food.count){
          // v如果直接添加count属性 比如 this.food.count 这样添加的属性是不会响应的  
          // vue提供了一个set方法来对添加的属性进行响应
          Vue.set(this.food,'count',1)
        }else{
          this.food.count ++;
        }
      },
      descrease() {
        this.food.count --;
      }
    }
  }
</script>

<style lang='scss' scoped='' type='text/css'>
  .cart-control{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 0.12rem;
      font-size: 0.32rem;
      line-height: 0.24rem;
      color: rgb(0, 160, 220);
      vertical-align: top;
      &.slide-enter-active{
        transition: all 5s ease
      }
      &.slide-enter{
        transform: translate3d(10px)
      }
    }
    .cart-count{
      display: inline-block;
      font-size:0.24rem;
      width: 0.24rem;
      text-align: center;
      line-height: 0.48rem;
      color: rgb(147, 153, 159);
      vertical-align: top;
    }
    .cart-add{
      display: inline-block;
      font-size: 0.28rem;
      color: rgb(0, 160, 220);
      padding: 0.12rem;
      vertical-align: top;
      line-height: 0.24rem;
    }
  }
</style>