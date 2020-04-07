export class Heartbeat {
  constructor (ws, options = {}) {
    const defaultOptions = {
      message: 'ping',
      period: 50000
    }
    this.ws = ws
    this.options = { ...defaultOptions, ...options }
    this.checkIntervalId = null
  }

  check () {
    this.checkIntervalId = setInterval(() => {
      this.ws.send(this.options.message)
    }, this.options.period)
  }

  stopCheck () {
    clearInterval(this.checkIntervalId)
    this.checkIntervalId = null
  }

  recheck () {
    this.stopCheck()
    this.check()
  }
}
