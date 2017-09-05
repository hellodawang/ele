<template>
  <div class="star" >
    <span v-for="itemCLass in itemClasses" :class="itemCLass"  class="iconfont star-item"></span>
  </div>
</template>

<script type='ecmascript-6'>
  const CLS_ON = "icon-star";
  const CLS_OFF = "icon-unstar";
  const CLS_HALF = "icon-half-star";
   export default{
    props:{
      score : {
        type: Number
      }
    },
    computed: {
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score*2)/2;
        let hasDecimal = score%1 !== 0;
        let integer = Math.floor(score);
        for(let i = 0 ; i< integer; i++){
          result.push(CLS_ON);
        }
        if(hasDecimal){ 
          result.push(CLS_HALF)
        }
        while(result.length>1 && result.length<5){
          result.push(CLS_OFF);
        }
        return result;
      }
    },
   }
</script>

<style lang='scss' scoped='' type='text/css'>
  .star{
    text-align: center;
  }
  .star-item{
    display: inline-block;
    margin-right: 0.3rem;
    &::last-child{
      margin-right: 0;
    }
  }
  .iconfont{
    font-size: 0.42rem;
  }
  .icon-unstar:before { content: "\e601"; color:#ccc}
  .icon-star:before { content: "\e601"; color:#fe0}
  .icon-half-star:before { content: "\e616"; color:#fe0}
</style>