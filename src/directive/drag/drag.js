export default {
    bind(el, binding) {
      const oDiv = el
      oDiv.onmousedown = (e) => {
        const disX = e.clientX - oDiv.offsetLeft
        const disY = e.clientY - oDiv.offsetTop
        e.preventDefault()
        document.onmousemove = (e) => {
          const left = e.clientX - disX
          const top = e.clientY - disY
          oDiv.style.left = left + 'px'
          oDiv.style.top = top + 'px'
          e.preventDefault()
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
          binding.value.fn({ x: e.pageX, y: e.pageY, id: binding.value.id })
          e.preventDefault()
        }
      }
    }
  }
  