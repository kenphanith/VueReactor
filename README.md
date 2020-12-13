# VueReactor

A libary that give vue application the unidirectional data flow architecture

![a91c1688-2321-11e7-8f04-bf91031a09dd](https://user-images.githubusercontent.com/15508766/101987998-6b8ef480-3cda-11eb-8015-16f75ee2b574.png)

# Usage

```javascript
mounted () {
  // actions binding
  VueReactor.el.someBtn.rx().click().pipe(
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
