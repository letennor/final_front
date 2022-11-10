import dragDialog from './el-dragDialog'
import waves from './waves'
import buttonPrivilege from './buttonPrivilege'
import uploadPreview from './uploadePreview'
import initHeight from './initHeight'
import drag from './drag'
export default function createDirectives(Vue) {
  Vue.use(dragDialog)
  Vue.use(waves)
  Vue.use(buttonPrivilege)
  Vue.use(uploadPreview)
  Vue.use(initHeight)
  Vue.use(drag)
}
