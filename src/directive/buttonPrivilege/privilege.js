import store from '../../store'
import myStroage from '@/utils/sessionStorage'
export default {
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
