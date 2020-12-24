import { install } from './utils'
import mixin from './mixin'

export default function VueReactor (Vue) {
  install(Vue)
  Vue.mixin(mixin)
}

// auto install
if (typeof Vue !== 'undefined') {
  Vue.use(VueReactor)
}