export default {
    update(el, binding, vnode) {
      const fileList = binding.value
      if (fileList.length === 0) return
      vnode.context.$nextTick(() => {
        const uploadList = el.getElementsByClassName('el-upload-list__item-name')
        for (let index = 0; index < uploadList.length; index++) {
          uploadList[index].onclick = function fn() {
            window.open(fileList[index].url)
          }
        }
      })
    }
  }
  