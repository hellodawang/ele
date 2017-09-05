<template>
  <div id="app">
    <v-header :seller="seller" ></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/comment">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view></router-view>
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
    var that = this
    this.$ajax('./api/seller')
      .then(function (response) {
        that.$nextTick(function () {
          this.seller = response.data.data
        })
      })
  }
}
</script>

<style lang='scss' scoped="" >
  @import url('./common/scss/base.scss');
  .tab{
    display: flex;
    height: 0.8rem;
    .tab-item{
      flex: 1;
      text-align: center;
      line-height: 0.8rem;
      a{
        display: block;
        &.active{
          color: #f66;
        }
      }
    }
  }
</style>
