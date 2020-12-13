import { Subject } from 'rxjs'
import mixin from './mixin'

export default function VueReactor (Vue) {
  Vue.mixin(mixin)
}