window["WS"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./src/heartbeat.js":
/*!**************************!*\
  !*** ./src/heartbeat.js ***!
  \**************************/
/*! exports provided: Heartbeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Heartbeat", function() { return Heartbeat; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Heartbeat {
  constructor(ws) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultOptions = {
      message: 'ping',
      period: 50000
    };
    this.ws = ws;
    this.options = _objectSpread({}, defaultOptions, {}, options);
    this.checkIntervalId = null;
  }

  check() {
    this.checkIntervalId = setInterval(() => {
      this.ws.send(this.options.message);
    }, this.options.period);
  }

  stopCheck() {
    clearInterval(this.checkIntervalId);
    this.checkIntervalId = null;
  }

  recheck() {
    this.stopCheck();
    this.check();
  }

}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: WebSocketClient, EventHub, Heartbeat, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketClient", function() { return WebSocketClient; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heartbeat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heartbeat */ "./src/heartbeat.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHub", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["EventHub"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Heartbeat", function() { return _heartbeat__WEBPACK_IMPORTED_MODULE_1__["Heartbeat"]; });



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var defaultOptions = {
  connectImmediately: true,
  defaultEventHandler: true,
  connectLogSilent: false,
  eventLogSilent: false,
  maxReconnectTimes: 3,
  reconnectTimeInterval: 30000,
  immediateReconnectTimeInterval: 2000,
  heartbeatPeriod: 50000,
  heartbeatMessage: 'ping',
  heartbeatLogSilent: false
};
class WebSocketClient {
  // eslint-disable-next-line

  /**
   * WebSocketClient constructor
   * @param { number }  heartbeatPeriod    心跳周期(ms)                              default: 50000
   * @param { boolean}  connectImmediately WebSocketClient实例化后是否立即连接服务端    default: false
   * @param { string | object }  heartbeatMessage   心跳检测时向服务端发送的消息        default: 'ping'
   */
  constructor(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.url = url;
    this.options = options;
    this.defaultOptions = _objectSpread({}, defaultOptions);
    this.$options = _objectSpread({}, this.defaultOptions, {}, options);
    this.wasClean = null; // Boolean. 是否正常断开。一般异常断开时，该值为false

    this.reconnectTimes = 0; // 第n次重连的flag

    this._messageCache = [];
    if (this.$options.connectImmediately) this.createWebSocket(url);
    this.heartbeat = new _heartbeat__WEBPACK_IMPORTED_MODULE_1__["Heartbeat"](this, {
      message: this.$options.heartbeatMessage,
      period: this.$options.heartbeatPeriod
    });

    this._init();
  }

  createWebSocket() {
    if ('WebSocket' in window) {
      if (this.readyState === undefined || this.readyState === WebSocket.CLOSED) {
        this.ws = new WebSocket(this.url);
        if (this.$options.defaultEventHandler) this.initEventsHandler();
      }
    } else {
      alert('WebSocket is not supported in your browser!');
    }
  }

  reconnectWebSocket() {
    var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultOptions.reconnectTimeInterval;

    if (times < this.$options.maxReconnectTimes) {
      if (!this.$options.connectLogSilent) {
        console.log("Try to reconnect the WebSocket after ".concat(interval / 1000, " seconds."));
      }

      setTimeout(t => {
        if (!this.$options.connectLogSilent) {
          console.log("".concat(t + 1, "th attempt to reconnect to webSocket server."));
        }

        this.reconnectTimes++;
        this.createWebSocket();
      }, interval, times);
    } else {
      if (!this.$options.connectLogSilent) {
        console.error("Could not create connection to websocket server. Attempted reconnect ".concat(this.$options.maxReconnectTimes, " times. Giving up!"));
      }
    }
  }

  initEventsHandler() {
    this.ws.addEventListener('open', () => {
      if (!this.$options.eventLogSilent) {
        console.log("The Websocket has opened at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_2__["getTime"])(), "."));
      }

      this.wasClean = null;
      this.reconnectTimes = 0; // 重连后重置

      this.heartbeat.recheck(); // 心跳检测

      this.sendCachedMessage();
    });
    this.ws.addEventListener('message', event => {
      this.heartbeat.recheck(); // 心跳检测

      var data = JSON.parse(event.data);
      this.trigger(data.message, data);
    });
    this.ws.addEventListener('close', event => {
      this.wasClean = !!event.wasClean;

      if (this.wasClean) {
        if (!this.$options.eventLogSilent) {
          console.log("The WebSocket connection has been closed normally at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_2__["getTime"])(), "."), event);
        }
      } else {
        if (!this.$options.eventLogSilent) {
          console.error("closed at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_2__["getTime"])(), "."), event);
        }

        this.reconnectWebSocket(this.reconnectTimes, this.reconnectTimes > 0 ? this.$options.reconnectTimeInterval : this.$options.immediateReconnectTimeInterval);
      }

      this.heartbeat.stopCheck(); // 关闭后停止心跳检测
    });
    this.ws.addEventListener('error', error => {
      if (!this.$options.eventLogSilent) {
        console.error("The WebSocket connection has been closed due to an error at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_2__["getTime"])(), "."), error);
      }
    });
  }

  cacheMessage(message) {
    var index = this._messageCache.indexOf(message);

    if (index === -1) {
      this._messageCache.push(message);
    }
  }

  sendCachedMessage() {
    if (this._messageCache.length === 0) return;

    var msg = this._messageCache.shift();

    this.send(msg);
    setTimeout(() => {
      this.sendCachedMessage();
    }, 100);
  }
  /**
   * 1. 判断当前websocket的连接状态为OPEN状态时发送消息
   * 2. TODO: 当非OPEN状态时，判断是否为正常断开。只有当websocket为异常断开时，才存储信息
   * @param { object } message
   */


  send(message) {
    switch (this.readyState) {
      case undefined:
        {
          /**
           * WebSocket is not instantiated. Store the message to the messageCache
           * and send it after the WebSocket open. Then invoke the createWebSocket method.
           *
           */
          if (message !== this.$options.heartbeatMessage) {
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
          if (message !== this.$options.heartbeatMessage) {
            this.cacheMessage(message);
          }

          break;
        }

      case WebSocket.OPEN:
        {
          // WebSocket is connected and send the message directly.
          if (message === this.$options.heartbeatMessage) {
            console.log("Heartbeat check at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_2__["getTime"])(), "."));
            break;
          }

          var index = this._messageCache.indexOf(message);

          if (index !== -1) {
            // 如果该msg在messageCache内，则从messageCache中删除该msg
            this._messageCache.splice(index, 1);
          }

          this.ws.send(JSON.stringify(message));
          break;
        }

      default:
        {
          /**
           * TODO: Do not store the message if this.wasClean is true
           * Store the message to the messageCache
           * and send it after the WebSocket is reconnected.
           */
          if (message !== this.$options.heartbeatMessage) {
            this.cacheMessage(message);
          }
        }
    }
  }

  close() {
    var _this$ws;

    (_this$ws = this.ws) === null || _this$ws === void 0 ? void 0 : _this$ws.close();
  }

  _init() {
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

          if (res && Object(_util__WEBPACK_IMPORTED_MODULE_2__["isPromise"])(res) && !res._handled) {
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

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(WebSocketClient, "STATUS", ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']);



/* harmony default export */ __webpack_exports__["default"] = (WebSocketClient);

/***/ }),

/***/ "./src/util/events.js":
/*!****************************!*\
  !*** ./src/util/events.js ***!
  \****************************/
/*! exports provided: EventHub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventHub", function() { return EventHub; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/util/index.js");

class EventHub {
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

          if (res && Object(_index__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(res) && !res._handled) {
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

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! exports provided: isPromise, EventHub, getTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/util/events.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHub", function() { return _events__WEBPACK_IMPORTED_MODULE_0__["EventHub"]; });

/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time */ "./src/util/time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTime", function() { return _time__WEBPACK_IMPORTED_MODULE_1__["getTime"]; });



function isPromise(p) {
  return p !== undefined && p !== null && typeof p.then === 'function' && typeof p.catch === 'function';
}

/***/ }),

/***/ "./src/util/time.js":
/*!**************************!*\
  !*** ./src/util/time.js ***!
  \**************************/
/*! exports provided: getTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTime", function() { return getTime; });
function getTime() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  return "".concat(year, "-").concat(f(month), "-").concat(f(date), " ").concat(f(hour), ":").concat(f(minute), ":").concat(f(second));

  function f(num) {
    return num > 9 ? num : '0' + num;
  }
}

/***/ })

/******/ });
//# sourceMappingURL=websocket-client.dev.js.map