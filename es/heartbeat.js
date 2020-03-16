import _extends from "@babel/runtime/helpers/esm/extends";
export class Heartbeat {
  constructor(ws, options) {
    if (options === void 0) {
      options = {};
    }

    var defaultOptions = {
      message: 'ping',
      period: 50000
    };
    this.ws = ws;
    this.options = _extends({}, defaultOptions, {}, options);
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
//# sourceMappingURL=heartbeat.js.map