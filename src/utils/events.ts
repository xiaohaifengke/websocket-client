import { isPromise } from './index'
import { CustomEvents, CustomEventsHandler } from '../types'

export class EventHub {
  private _events: CustomEvents
  constructor() {
    this._events = Object.create(null)
  }
  on(event: string, func: CustomEventsHandler) {
    if (!this._events) this._events = Object.create(null)
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], func)
      }
    } else {
      ;(this._events[event] || (this._events[event] = [])).push(func)
    }
    return this
  }

  once(event: string, func: CustomEventsHandler) {
    const once = (...args: any[]) => {
      this.off(event, once)
      func.apply(this, args)
    }

    once.func = func
    this.on(event, once)
    return this
  }

  off(event?: string, func?: CustomEventsHandler) {
    // all
    if (!event) {
      this._events = Object.create(null)
      return this
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], func)
      }
      return this
    }
    // specific event
    const cbs = this._events[event]
    if (!cbs) {
      return this
    }
    if (!func) {
      this._events[event] = []
      return this
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === func || cb.func === func) {
        cbs.splice(i, 1)
        break
      }
    }
    return this
  }

  trigger(event: string, ...args: any[]) {
    let cbs = this._events[event]
    if (cbs) {
      cbs = [...cbs]
      let res
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          res = cbs[i].apply(this, args)
          if (res && isPromise(res) && !res._handled) {
            res.catch((e: any) => console.error(e))
            res._handled = true
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    return this
  }
}
