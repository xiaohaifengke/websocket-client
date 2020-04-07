import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Heartbeat } from './heartbeat';
import { isPromise, getTime, isArrayBufferView, isPlainObject } from './util';
var defaultOptions = {
  connectImmediately: true,
  enableDefaultEventHandler: true,
  connectLogSilent: false,
  eventLogSilent: false,
  maxReconnectTimes: 3,
  reconnectTimeInterval: 30000,
  immediateReconnectTimeInterval: 2000,
  enableMessageCache: false,
  message: 'message',
  heartbeatPeriod: 50000,
  heartbeatMessage: 'ping',
  heartbeatLogSilent: false
};
export var WebSocketClient = /*#__PURE__*/function () {
  /**
   * WebSocketClient constructor
   * @param { string }  url
   * @param { object | undefined }  options
   */
  function WebSocketClient(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, WebSocketClient);

    this.url = url;
    this.options = options;
    this.defaultOptions = _objectSpread({}, defaultOptions);
    this.$options = _objectSpread({}, this.defaultOptions, {}, options);
    this.wasClean = null; // Boolean. 是否正常断开。一般异常断开时，该值为false

    this.reconnectTimes = 0; // 第n次重连的flag

    this._messageCache = [];
    if (this.$options.connectImmediately) this.createWebSocket();
    this.heartbeat = new Heartbeat(this, {
      message: this.$options.heartbeatMessage,
      period: this.$options.heartbeatPeriod
    });

    this._init();
  }

  _createClass(WebSocketClient, [{
    key: "createWebSocket",
    value: function createWebSocket() {
      if ('WebSocket' in window) {
        if (this.readyState === undefined || this.readyState === WebSocket.CLOSED) {
          this.ws = new WebSocket(this.url);
          if (this.$options.enableDefaultEventHandler) this.initEventsHandler();
        }
      } else {
        console.log('WebSocket is not supported in your browser!');
      }
    }
  }, {
    key: "reconnectWebSocket",
    value: function reconnectWebSocket() {
      var _this = this;

      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$options.reconnectTimeInterval;

      if (times < this.$options.maxReconnectTimes) {
        if (!this.$options.connectLogSilent) {
          console.log("Try to reconnect the WebSocket after ".concat(interval / 1000, " seconds."));
        }

        setTimeout(function (t) {
          if (!_this.$options.connectLogSilent) {
            console.log("".concat(t + 1, "th attempt to reconnect to webSocket server."));
          }

          _this.reconnectTimes++;

          _this.createWebSocket();
        }, interval, times);
      } else {
        if (!this.$options.connectLogSilent) {
          console.error("Could not create connection to websocket server. Attempted reconnect ".concat(this.$options.maxReconnectTimes, " times. Giving up!"));
        }
      }
    }
  }, {
    key: "initEventsHandler",
    value: function initEventsHandler() {
      var _this2 = this;

      this.ws.addEventListener('open', function () {
        if (!_this2.$options.eventLogSilent) {
          console.log("The Websocket has opened at ".concat(getTime(), "."));
        }

        _this2.wasClean = null;
        _this2.reconnectTimes = 0;

        _this2.heartbeat.recheck();

        _this2.sendCachedMessage();
      });
      this.ws.addEventListener('message', function (event) {
        _this2.heartbeat.recheck();

        var data = JSON.parse(event.data);

        if (isPlainObject(data)) {
          var message = _this2.$options.message;
          var eventName = data[message];
          eventName && typeof eventName === 'string' && _this2.trigger(eventName, data);
        }
      });
      this.ws.addEventListener('close', function (event) {
        _this2.wasClean = !!event.wasClean;

        if (_this2.wasClean) {
          if (!_this2.$options.eventLogSilent) {
            console.log("The WebSocket connection has been closed normally at ".concat(getTime(), "."), event);
          }
        } else {
          if (!_this2.$options.eventLogSilent) {
            console.error("closed at ".concat(getTime(), "."), event);
          }

          _this2.reconnectWebSocket(_this2.reconnectTimes, _this2.reconnectTimes > 0 ? _this2.$options.reconnectTimeInterval : _this2.$options.immediateReconnectTimeInterval);
        }

        _this2.heartbeat.stopCheck();
      });
      this.ws.addEventListener('error', function (error) {
        if (!_this2.$options.eventLogSilent) {
          console.error("The WebSocket connection has been closed due to an error at ".concat(getTime(), "."), error);
        }
      });
    }
  }, {
    key: "cacheMessage",
    value: function cacheMessage(message) {
      var index = this._messageCache.indexOf(message);

      if (index === -1) {
        this._messageCache.push(message);
      }
    }
  }, {
    key: "sendCachedMessage",
    value: function sendCachedMessage() {
      var _this3 = this;

      if (this._messageCache.length === 0) return;

      var msg = this._messageCache.shift();

      this.send(msg);
      setTimeout(function () {
        _this3.sendCachedMessage();
      }, 100);
    }
    /**
     * 1. 判断当前websocket的连接状态为OPEN状态时发送消息
     * 2. TODO: 当非OPEN状态时，判断是否为正常断开。只有当websocket为异常断开时，才存储信息
     * 3. FIXME: 某些早期浏览器不支持readyState属性，故该方法内的逻辑应该添加相应的判断
     * @param { object } message
     */

  }, {
    key: "send",
    value: function send(message) {
      switch (this.readyState) {
        case undefined:
          {
            /**
             * WebSocket is not instantiated. Store the message to the messageCache
             * and send it after the WebSocket open. Then invoke the createWebSocket method.
             *
             */
            if (message !== this.$options.heartbeatMessage && this.$options.enableMessageCache) {
              this.cacheMessage(message);
            }

            this.createWebSocket();
            break;
          }

        case WebSocket.CONNECTING:
          {
            /**
             * WebSocket is connecting. Store the message to the messageCache
             * and send it after the WebSocket open.
             *
             */
            if (message !== this.$options.heartbeatMessage && this.$options.enableMessageCache) {
              this.cacheMessage(message);
            }

            break;
          }

        case WebSocket.OPEN:
          {
            // WebSocket is connected and send the message directly.
            if (message === this.$options.heartbeatMessage) {
              console.log("Heartbeat check at ".concat(getTime(), "."));
              break;
            }

            var index = this._messageCache.indexOf(message);

            if (index !== -1) {
              // 如果该msg在messageCache内，则从messageCache中删除该msg
              this._messageCache.splice(index, 1);
            }

            if (message instanceof Blob || message instanceof ArrayBuffer || isArrayBufferView(message)) {
              this.ws.send(message);
            } else {
              this.ws.send(JSON.stringify(message));
            }

            break;
          }

        default:
          {
            /**
             * TODO: Do not store the message if this.wasClean is true
             * Store the message to the messageCache
             * and send it after the WebSocket is reconnected.
             */
            if (message !== this.$options.heartbeatMessage && this.$options.enableMessageCache) {
              this.cacheMessage(message);
            }
          }
      }
    }
    /**
     * TODO:
     * It may be helpful to examine the socket's bufferedAmount attribute before attempting to
     * close the connection to determine if any data has yet to be transmitted on the network.
     * If this value isn't 0, there's pending data still, so you may wish to wait before closing the connection.
     */

  }, {
    key: "close",
    value: function close() {
      var _this$ws;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_this$ws = this.ws) === null || _this$ws === void 0 ? void 0 : _this$ws.close.apply(_this$ws, args);
    }
  }, {
    key: "_init",
    value: function _init() {
      Object.defineProperties(this, {
        readyState: {
          enumerable: true,
          get: function get() {
            var _this$ws2;

            return (_this$ws2 = this.ws) === null || _this$ws2 === void 0 ? void 0 : _this$ws2.readyState;
          }
        },
        status: {
          enumerable: true,
          get: function get() {
            return this.readyState >= 0 ? this.constructor.STATUS[this.readyState] : 'UNCREATE';
          }
        },
        onopen: {
          enumerable: true,
          get: function get() {
            var _this$ws3;

            return (_this$ws3 = this.ws) === null || _this$ws3 === void 0 ? void 0 : _this$ws3.onopen;
          },
          set: function set(fn) {
            this.ws && (this.ws.onopen = fn);
          }
        },
        onmessage: {
          enumerable: true,
          get: function get() {
            var _this$ws4;

            return (_this$ws4 = this.ws) === null || _this$ws4 === void 0 ? void 0 : _this$ws4.onmessage;
          },
          set: function set(fn) {
            this.ws && (this.ws.onmessage = fn);
          }
        },
        onclose: {
          enumerable: true,
          get: function get() {
            var _this$ws5;

            return (_this$ws5 = this.ws) === null || _this$ws5 === void 0 ? void 0 : _this$ws5.onclose;
          },
          set: function set(fn) {
            this.ws && (this.ws.onclose = fn);
          }
        },
        onerror: {
          enumerable: true,
          get: function get() {
            var _this$ws6;

            return (_this$ws6 = this.ws) === null || _this$ws6 === void 0 ? void 0 : _this$ws6.onerror;
          },
          set: function set(fn) {
            this.ws && (this.ws.onerror = fn);
          }
        }
      });
    }
  }, {
    key: "on",
    value: function on(event, func) {
      if (!this._events) this._events = Object.create(null);

      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          this.on(event[i], func);
        }
      } else {
        ;
        (this._events[event] || (this._events[event] = [])).push(func);
      }

      return this;
    }
  }, {
    key: "once",
    value: function once(event, func) {
      var $this = this;

      function once() {
        $this.off(event, once);
        func.apply($this, arguments);
      }

      once.func = func;
      this.on(event, once);
      return this;
    }
  }, {
    key: "off",
    value: function off(event, func) {
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
  }, {
    key: "trigger",
    value: function trigger(event) {
      var cbs = this._events[event];

      if (cbs) {
        cbs = _toConsumableArray(cbs);
        var res;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        for (var i = 0, l = cbs.length; i < l; i++) {
          try {
            res = cbs[i].apply(this, args);

            if (res && isPromise(res) && !res._handled) {
              res.catch(function (e) {
                return console.error(e);
              });
              res._handled = true;
            }
          } catch (e) {
            console.error(e);
          }
        }
      }

      return this;
    }
  }]);

  return WebSocketClient;
}();

_defineProperty(WebSocketClient, "STATUS", ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']);

export { Heartbeat };
export { EventHub } from './util';
export default WebSocketClient;
//# sourceMappingURL=index.js.map