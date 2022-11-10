<template>
  <div class="right-tags-container slide">
    <div class="button-tag" :class="projectType==='construct'?'on':'off'" @click="turnTo('construct')">
      <span>建设</span>
    </div>
    <div class="button-tag" :class="projectType==='consult'?'on':'off'" @click="turnTo('consult')">
      <span>咨询</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RightTags',
    data() {
      return {
        projectType: this.$storage.getStorage('projectType')
      }
    },
    mounted() {
    },
    methods: {
      turnTo(type) {
        this.$storage.setStorage('projectType', type)
        location.reload()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .right-tags-container {
    position: fixed;

    z-index: 9;
    .button-tag {
      cursor: pointer;
      line-height: 32px;
      width: auto;
      padding: 0 20px;
      background-color: rgb(0, 183, 255);
      color: white;
      text-align: center;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      margin: 10px 0;
    }
    .on {
      background-color: #ee9900;
    }
    .off {
      background-color: rgb(0, 183, 255);
    }
  }
  .slide{
    right: -60px;
    transition: 0.5s;
  }
  .slide:hover {
    transform: translateX(-60px);
  }
</style>
