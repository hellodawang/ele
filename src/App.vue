<template>
  <div id="app">
    <v-header :seller="seller" ></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/comment">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
export default {
  data () {
    return {
      seller: {}
    }
  },
  components: {
    // 注册组件
    'v-header': header
  },
  created: function () {
    this.$ajax('./api/seller')
      .then((response) => {
        this.seller = response.data.data
      })
  }
}
</script>

<style lang='scss' scoped="" >
  @import url('./common/scss/base.scss');
  .tab{
    display: flex;
    height: 0.8rem;
    border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
    .tab-item{
      flex: 1;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.24rem;
      a{
        display: block;
        &.active{
          color: #f66;
        }
      }
    }
  }
</style>
