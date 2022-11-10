<template>
  <i :class="svgClass"></i>
</template>

<script>
  export default {
    name: 'SvgIcon',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    },
    computed: {
      svgClass() {
        return 'icon iconfont myIcon ' + this.iconClass
      }
    }
  }
</script>

<style scoped>
  .myIcon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    color: #BFD9FF !important;
    margin-right: 5px;
  }
</style>
