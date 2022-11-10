export default {
    bind(el, binding) {
      let offset = 170
      let div = 1
      let gap = 10
      if (binding.value && binding.value.offset) {
        offset = binding.value.offset
      }
      // 解决多个相同的el-card的场景
      if (binding.value && binding.value.div) {
        div = binding.value.div
      }
      if (binding.value && binding.value.gap) {
        gap = binding.value.gap
      }
      const height = (document.getElementById('app').clientHeight - offset - (div - 1) * gap) / div
      el.style = `height:${height}px!important;`
    }
  }
  