import drag from './drag'

const install = function fn(Vue) {
  Vue.directive('dragDialog', drag)
}

if (window.Vue) {
  window['dragDialog'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
