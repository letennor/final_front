import store from '../../store'
import myStroage from '@/utils/sessionStorage'
export default {
  // 2020.5.15 by zhujun 将bind改为inserted 保证el.parentNode 存在
  inserted(el, binding) {
    if (!binding.value || binding.value === '') {
      return
    }
    if (myStroage.getStorage('project')) {

      if (store.getters.projectButtonPrivileges.indexOf(binding.value) === -1) {
        el.parentNode.removeChild(el)
      }
    } else {
      if (store.getters.buttonPrivileges.indexOf(binding.value) === -1) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
