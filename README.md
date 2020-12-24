# VueReactor (This repository is WIP)

A libary that give vue application the unidirectional data flow architecture

# Usage

```javascript
mounted () {
  // actions binding
  this.$VueReactor.someBtn.rx().click().pipe(
    map(res => this.$actionType.increment()),
    bind(res => this.$action)
  )
  
  // state binding
  this.$state.pipe(
    map(state => state.counter),
    bind(counter => VueReactor.el.label.rx().text())
  )
},
mutation (action, context) {
  switch (action) {
    case context.$actionType.increment():
      return context.$mutate(context.$mutationType.increment)
    case context.$actionType.decrement():
      return context.$mutate(context.$mutationType.decrement)
    default: return empty()
  }
},
reduce (state, mutation, context) {
  var newState = state
  switch (mutation) {
    case context.$mutationType.increment:
      newState.counter++
      break
    case context.$mutationType.decrement:
      newState.couter--
      break
    default: break
  }
  
  return newState
},
actionType: [
  'increment',
  'decrement'
],
state: {
  counter: 0
}
```
