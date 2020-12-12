import { Subject } from 'rxjs'
import mixin from './mixin'

// this class should be singleton
export default class VueReactor {

  static el = {}

  // constructor
  constructor () {}

  static Init = (Vue) => {
    Vue.mixin(mixin)
  }
}