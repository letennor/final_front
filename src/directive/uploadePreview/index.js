
import uploadPreview from './uploadPreview'

const install = function(Vue) {
  Vue.directive('uploadPreview', uploadPreview)
}

if (window.Vue) {
  window['uploadPreview'] = uploadPreview
  Vue.use(install); // eslint-disable-line
}

uploadPreview.install = install
export default uploadPreview
