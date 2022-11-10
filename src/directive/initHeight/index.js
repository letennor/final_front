import initHeight from './initHeight'

const install = function(Vue) {
  Vue.directive('initHeight', initHeight)
}

if (window.Vue) {
  window['initHeight'] = initHeight
  Vue.use(install); // eslint-disable-line
}

initHeight.install = install
export default initHeight
