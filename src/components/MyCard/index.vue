<template>
  <div class="MyCard">
    <el-card class="box-card mxCard">
      <div class="table">
        <span class="titleSpan">{{ title }}</span>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'MyCard',
    props: {
      title: { type: String, default: '' }
    },
    data() {
      return {}
    },
    mounted() {
      document.getElementsByClassName('mxCard')[0].style.minHeight = document.getElementById('app').clientHeight - 150 + 'px'
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mxCard {
    border-radius: 6px;

    .table {
      /*border-bottom: 2px solid rgba(0, 0, 0, 0.1);*/
      padding-bottom: 10px;
      margin-bottom: 10px;

      .titleSpan {
        border-left: 3px solid #1CADE4;
        padding-left: 8px;
        line-height: 14px;
        display: inline-block;
        /*font-size: 18px;*/
        /*font-weight: 700;*/
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .mxCard {
    .el-card__body {
      padding: 20px 40px;
    }
  }
</style>
