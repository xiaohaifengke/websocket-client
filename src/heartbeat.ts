import WebSocketClient from './index'

export interface WSClientHeartbeatOptions {
  message: string
  period: number
}

export class Heartbeat {
  ws: WebSocketClient
  options: WSClientHeartbeatOptions
  checkIntervalId: ReturnType<typeof setInterval> | undefined | number

  constructor(
    ws: WebSocketClient,
    options: Partial<WSClientHeartbeatOptions> = {}
  ) {
    const defaultOptions: WSClientHeartbeatOptions = {
      message: 'ping',
      period: 50000
    }
    this.ws = ws
    this.options = { ...defaultOptions, ...options }
    this.checkIntervalId = undefined
  }

  check() {
    this.checkIntervalId = setInterval(() => {
      this.ws.send(this.options.message)
    }, this.options.period)
  }

  stopCheck() {
    clearInterval(this.checkIntervalId as number)
    this.checkIntervalId = undefined
  }

  recheck() {
    this.stopCheck()
    this.check()
  }
}
