import { isPromise } from './index';
export class EventHub {
  on(event, func) {
    if (!this._events) this._events = Object.create(null);

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this.on(event[i], func);
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(func);
    }

    return this;
  }

  once(event, func) {
    var $this = this;

    function once() {
      $this.off(event, once);
      func.apply($this, arguments);
    }

    once.func = func;
    this.on(event, once);
    return this;
  }

  off(event, func) {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      return this;
    } // array of events


    if (Array.isArray(event)) {
      for (var _i = 0, l = event.length; _i < l; _i++) {
        this.off(event[_i], func);
      }

      return this;
    } // specific event


    var cbs = this._events[event];

    if (!cbs) {
      return this;
    }

    if (!func) {
      this._events[event] = null;
      return this;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === func || cb.func === func) {
        cbs.splice(i, 1);
        break;
      }
    }

    return this;
  }

  trigger(event) {
    var cbs = this._events[event];

    if (cbs) {
      cbs = [...cbs];
      var res;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          res = cbs[i].apply(this, args);

          if (res && isPromise(res) && !res._handled) {
            res.catch(e => console.error(e));
            res._handled = true;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    return this;
  }

}
//# sourceMappingURL=events.js.map