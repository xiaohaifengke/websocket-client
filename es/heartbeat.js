import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

export var Heartbeat = /*#__PURE__*/function () {
  function Heartbeat(ws) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Heartbeat);

    var defaultOptions = {
      message: 'ping',
      period: 50000
    };
    this.ws = ws;
    this.options = _objectSpread({}, defaultOptions, {}, options);
    this.checkIntervalId = null;
  }

  _createClass(Heartbeat, [{
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
//# sourceMappingURL=heartbeat.js.map