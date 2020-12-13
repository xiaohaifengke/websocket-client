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

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

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

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

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
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Heartbeat = /*#__PURE__*/function () {
  function Heartbeat(ws) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Heartbeat);

    var defaultOptions = {
      message: 'ping',
      period: 50000
    };
    this.ws = ws;
    this.options = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.checkIntervalId = null;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Heartbeat, [{
    key: "check",
    value: function check() {
      var _this = this;

      this.checkIntervalId = setInterval(function () {
        _this.ws.send(_this.options.message);
      }, this.options.period);
    }
  }, {
    key: "stopCheck",
    value: function stopCheck() {
      clearInterval(this.checkIntervalId);
      this.checkIntervalId = null;
    }
  }, {
    key: "recheck",
    value: function recheck() {
      this.stopCheck();
      this.check();
    }
  }]);

  return Heartbeat;
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: WebSocketClient, Heartbeat, EventHub, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketClient", function() { return WebSocketClient; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _heartbeat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./heartbeat */ "./src/heartbeat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Heartbeat", function() { return _heartbeat__WEBPACK_IMPORTED_MODULE_4__["Heartbeat"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHub", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["EventHub"]; });






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



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
var WebSocketClient = /*#__PURE__*/function () {
  /**
   * WebSocketClient constructor
   * @param { string }  url
   * @param { object | undefined }  options
   */
  function WebSocketClient(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, WebSocketClient);

    this.url = url;
    this.options = options;
    this.defaultOptions = _objectSpread({}, defaultOptions);
    this.$options = _objectSpread(_objectSpread({}, this.defaultOptions), options);
    this.wasClean = null; // Boolean. 是否正常断开。一般异常断开时，该值为false

    this.reconnectTimes = 0; // 第n次重连的flag

    this._messageCache = [];
    if (this.$options.connectImmediately) this.createWebSocket();
    this.heartbeat = new _heartbeat__WEBPACK_IMPORTED_MODULE_4__["Heartbeat"](this, {
      message: this.$options.heartbeatMessage,
      period: this.$options.heartbeatPeriod
    });

    this._init();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(WebSocketClient, [{
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
          console.log("The Websocket has opened at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["getTime"])(), "."));
        }

        _this2.wasClean = null;
        _this2.reconnectTimes = 0;

        _this2.heartbeat.recheck();

        _this2.sendCachedMessage();
      });
      this.ws.addEventListener('message', function (event) {
        _this2.heartbeat.recheck();

        var data = JSON.parse(event.data);

        if (Object(_util__WEBPACK_IMPORTED_MODULE_5__["isPlainObject"])(data)) {
          var message = _this2.$options.message;
          var eventName = data[message];
          eventName && typeof eventName === 'string' && _this2.trigger(eventName, data);
        }
      });
      this.ws.addEventListener('close', function (event) {
        _this2.wasClean = !!event.wasClean;

        if (_this2.wasClean) {
          if (!_this2.$options.eventLogSilent) {
            console.log("The WebSocket connection has been closed normally at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["getTime"])(), "."), event);
          }
        } else {
          if (!_this2.$options.eventLogSilent) {
            console.error("closed at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["getTime"])(), "."), event);
          }

          _this2.reconnectWebSocket(_this2.reconnectTimes, _this2.reconnectTimes > 0 ? _this2.$options.reconnectTimeInterval : _this2.$options.immediateReconnectTimeInterval);
        }

        _this2.heartbeat.stopCheck();
      });
      this.ws.addEventListener('error', function (error) {
        if (!_this2.$options.eventLogSilent) {
          console.error("The WebSocket connection has been closed due to an error at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["getTime"])(), "."), error);
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
              console.log("Heartbeat check at ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["getTime"])(), "."));
              this.ws.send(JSON.stringify(message));
              break;
            }

            var index = this._messageCache.indexOf(message);

            if (index !== -1) {
              // 如果该msg在messageCache内，则从messageCache中删除该msg
              this._messageCache.splice(index, 1);
            }

            if (message instanceof Blob || message instanceof ArrayBuffer || Object(_util__WEBPACK_IMPORTED_MODULE_5__["isArrayBufferView"])(message)) {
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
        cbs = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(cbs);
        var res;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        for (var i = 0, l = cbs.length; i < l; i++) {
          try {
            res = cbs[i].apply(this, args);

            if (res && Object(_util__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(res) && !res._handled) {
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

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(WebSocketClient, "STATUS", ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']);



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
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index */ "./src/util/index.js");




var EventHub = /*#__PURE__*/function () {
  function EventHub() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EventHub);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EventHub, [{
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
        cbs = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(cbs);
        var res;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        for (var i = 0, l = cbs.length; i < l; i++) {
          try {
            res = cbs[i].apply(this, args);

            if (res && Object(_index__WEBPACK_IMPORTED_MODULE_3__["isPromise"])(res) && !res._handled) {
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

  return EventHub;
}();

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! exports provided: EventHub, getTime, isPlainObject, isPromise, isArrayBufferView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayBufferView", function() { return isArrayBufferView; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/util/events.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventHub", function() { return _events__WEBPACK_IMPORTED_MODULE_0__["EventHub"]; });

/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time */ "./src/util/time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTime", function() { return _time__WEBPACK_IMPORTED_MODULE_1__["getTime"]; });



/**
 * Get the raw type string of a value, e.g., [object Object].
 */

var _toString = Object.prototype.toString;
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function isPromise(p) {
  return p !== undefined && p !== null && typeof p.then === 'function' && typeof p.catch === 'function';
}
function isArrayBufferView(obj) {
  return obj instanceof Int8Array || obj instanceof Uint8Array || obj instanceof Uint8ClampedArray || obj instanceof Int16Array || obj instanceof Uint16Array || obj instanceof Int32Array || obj instanceof Uint32Array || obj instanceof Float32Array || obj instanceof Float64Array || obj instanceof DataView;
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