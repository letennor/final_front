import privilege from './privilege'

const install = function(Vue) {
  Vue.directive('button-privilege', privilege)
}

if (window.Vue) {
  window['button-privilege'] = privilege
  Vue.use(install); // eslint-disable-line
}

privilege.install = install
export default privilege
