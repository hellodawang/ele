<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
  </div>
</template>

<script>
import header from './components/header/header'
export default {
  components: {
    'v-header': header
  }
}
</script>

<style lang='scss' scoped="" >
  .tab{
    display: flex;
    height: 0.4rem;
    .tab-item{
      flex: 1;
      text-align: center;
      line-height: 0.4rem;
    }
  }
</style>
