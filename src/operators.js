import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export const bind = (target) => (source) => {
  source.subscribe(res => {
    const action = target()
    action.next(res)
  })
}