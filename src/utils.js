export let Vue
export let warn = function () {}

export function defineReactive (vm, key, val) {
  if (key in vm) {
    vm[key] = val
  } else {
    Vue.util.defineReactive(vm, key, val)
  }
}

// TO-DO: refactor auto install
export function install (_Vue) {
  Vue = _Vue
  warn = Vue.util.warn || warn
}
