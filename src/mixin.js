import { Subject, Subscription, of, BehaviorSubject, ReplaySubject } from 'rxjs'
import { switchMap, tap, map } from 'rxjs/operators'
import VueReactor from '.'

export default {
  beforeCreate () {
    // register rx to HTMLElement
    HTMLElement.prototype.rx = function () {
      return {
        click: () => {
          const subject = new Subject()
          this.onclick = function () {
            subject.next(true)
          }
          return subject
        },
        change: () => {
          const subject = new Subject()
          this.onchange = function (e) {
            subject.next(e)
          }
          return subject
        },
        keydown: () => {
          const subject = new Subject()
          this.onkeydown = function (e) {
            subject.next(e)
          }
          return subject
        },
        text: () => {
          const subject = new Subject()
          subject.subscribe(res => this.innerText = `${res}`)
          return subject
        }
      }
    }
  },

  created () {
    const vm = this

    vm.$action = new Subject()
    vm.$state = new BehaviorSubject()
    vm.$mutate = function (type, ...params) {
      return of([type, params])
    }

    // TO-DO: this bind function will accept `reactor` object
    let bind = vm.$options.bind
    if (typeof bind === 'function') {
      // console.log('congrat bind')
    }
  },

  // $refs can only be manipulated in mounted callback
  mounted () {
    const vm = this

    // 1. create a function, capture the DOM element and return either
    //  a Subject or a BehaviourSubject (special because they can be either an observer or an observable)
    Object.keys(vm.$refs).forEach(ref => {
      const el = vm.$refs[ref]
      VueReactor.el[ref] = el
    })

    // this is where we can register state values
    let state = vm.$options.state
    if (typeof state === 'object') {
      vm.$state.next(state)
    }

    // given array of action will be converted to $actionType object
    let action = vm.$options.actionType
    if (typeof action === 'object') {
      vm.$actionType = {}
      action.forEach(a => {
        // this function should return Observable of type mutation
        vm.$actionType[a] = function (param) {
          return a
        }
      })
    }

    let m = vm.$options.mutationType
    if (typeof m === 'object') {
      vm.$mutationType = {}
      m.forEach(m => {
        vm.$mutationType[m] = m // TO-DO: probably we have to convert it to function type in order to accept params
      })
    }

    // mutation & reduce
    let mutation = vm.$options.mutation
    let reduce = vm.$options.reduce
    if (typeof mutation === 'function') {
      // TO-DO: I cannot figure out why $option cannot render the context
      // so for the time being, send the context as param
      vm.$action.pipe(
        switchMap(x => mutation(x, this)), // TO-DO: handle if the return is not Observable of $mutationType
        map(x => reduce(vm.$state.getValue(), x[0], this)), // TO-DO: handle if reduce is not a function
      ).subscribe(state => vm.$state.next(state))
    }

    // console.log(vm.$action)

    // register mutations
    /*
    let mutation = vm.$options.mutation
    if (typeof mutation === 'object') {
      vm.$mutation = {}
      mutation.forEach(m => {
        vm.$mutation[m] = function (action) {}
      })
    }
    */
  }
}