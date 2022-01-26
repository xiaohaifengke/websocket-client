import { getTime, isArrayBufferView, isPlainObject } from './utils'
import { WSClientOptions, StatusText, MessageType } from './types'
import { Heartbeat } from './heartbeat'
import { EventHub } from './utils'

const defaultOptions: WSClientOptions = {
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
}

export default class WebSocketClient extends EventHub {
  static STATUS = [
    StatusText.CONNECTING,
    StatusText.OPEN,
    StatusText.CLOSING,
    StatusText.CLOSED
  ]

  ws: WebSocket | undefined
  url: string
  defaultOptions: WSClientOptions
  options: Partial<WSClientOptions>
  wasClean: boolean | null
  reconnectTimes: number
  heartbeat: Heartbeat
  readyState: number | undefined
  onopen: ((...args: any[]) => any) | undefined
  onmessage: ((...args: any[]) => any) | undefined
  onclose: ((...args: any[]) => any) | undefined
  onerror: ((...args: any[]) => any) | undefined

  private $options: WSClientOptions
  private _messageCache: MessageType[]
  /**
   * WebSocketClient constructor
   * @param { string }  url
   * @param { object | undefined }  options
   */
  constructor(url: string, options: Partial<WSClientOptions> = {}) {
    super()
    this.url = url
    this.options = options
    this.defaultOptions = { ...defaultOptions }
    this.$options = { ...this.defaultOptions, ...options }
    this.wasClean = null // Boolean. 是否正常断开。一般异常断开时，该值为false
    this.reconnectTimes = 0 // 第n次重连的flag
    this._messageCache = []
    if (this.$options.connectImmediately) this.createWebSocket()
    this.heartbeat = new Heartbeat(this, {
      message: this.$options.heartbeatMessage,
      period: this.$options.heartbeatPeriod
    })

    this._init()
  }

  createWebSocket() {
    if ('WebSocket' in window) {
      if (
        this.readyState === undefined ||
        this.readyState === WebSocket.CLOSED
      ) {
        this.ws = new WebSocket(this.url)
        if (this.$options.onopen) this.onopen = this.$options.onopen
        if (this.$options.onmessage) this.onmessage = this.$options.onmessage
        if (this.$options.onclose) this.onclose = this.$options.onclose
        if (this.$options.onerror) this.onerror = this.$options.onerror
        this.heartbeat = new Heartbeat(this, {
          message: this.$options.heartbeatMessage,
          period: this.$options.heartbeatPeriod
        })
        if (this.$options.enableDefaultEventHandler) this.initEventsHandler()
      }
    } else {
      console.log('WebSocket is not supported in your browser!')
    }
  }

  reconnectWebSocket(
    times = 0,
    interval = this.$options.reconnectTimeInterval
  ) {
    if (times < this.$options.maxReconnectTimes) {
      if (!this.$options.connectLogSilent) {
        console.log(
          `Try to reconnect the WebSocket after ${interval / 1000} seconds.`
        )
      }
      setTimeout(
        (t) => {
          if (!this.$options.connectLogSilent) {
            console.log(`${t + 1}th attempt to reconnect to webSocket server.`)
          }
          this.reconnectTimes++
          this.createWebSocket()
        },
        interval,
        times
      )
    } else {
      if (!this.$options.connectLogSilent) {
        console.error(
          `Could not create connection to websocket server. Attempted reconnect ${this.$options.maxReconnectTimes} times. Giving up!`
        )
      }
    }
  }

  initEventsHandler() {
    this.ws!.addEventListener('open', () => {
      if (!this.$options.eventLogSilent) {
        console.log(`The Websocket has opened at ${getTime()}.`)
      }
      this.wasClean = null
      this.reconnectTimes = 0
      this.heartbeat.recheck()
      this.sendCachedMessage()
    })
    this.ws!.addEventListener('message', (event) => {
      this.heartbeat.recheck()
      const data = JSON.parse(event.data)
      if (isPlainObject(data)) {
        const message = this.$options.message!
        const eventName = data[message]
        eventName &&
          typeof eventName === 'string' &&
          this.trigger(eventName, data)
      }
    })
    this.ws!.addEventListener('close', (event) => {
      this.wasClean = !!event.wasClean
      if (this.wasClean) {
        if (!this.$options.eventLogSilent) {
          console.log(
            `The WebSocket connection has been closed normally at ${getTime()}.`,
            event
          )
        }
      } else {
        if (!this.$options.eventLogSilent) {
          console.error(`closed at ${getTime()}.`, event)
        }
        this.reconnectWebSocket(
          this.reconnectTimes,
          this.reconnectTimes > 0
            ? this.$options.reconnectTimeInterval
            : this.$options.immediateReconnectTimeInterval
        )
      }
      this.heartbeat.stopCheck()
    })
    this.ws!.addEventListener('error', (error) => {
      if (!this.$options.eventLogSilent) {
        console.error(
          `The WebSocket connection has been closed due to an error at ${getTime()}.`,
          error
        )
      }
    })
  }

  cacheMessage(message: MessageType) {
    const index = this._messageCache.indexOf(message)
    if (index === -1) {
      this._messageCache.push(message)
    }
  }

  sendCachedMessage() {
    if (this._messageCache.length === 0) return
    const msg = this._messageCache.shift()!
    this.send(msg)
    setTimeout(() => {
      this.sendCachedMessage()
    }, 100)
  }

  /**
   * 1. 判断当前websocket的连接状态为OPEN状态时发送消息
   * 2. TODO: 当非OPEN状态时，判断是否为正常断开。只有当websocket为异常断开时，才存储信息
   * 3. FIXME: 某些早期浏览器不支持readyState属性，故该方法内的逻辑应该添加相应的判断
   * @param { object } message
   */
  send(message: any) {
    switch (this.readyState) {
      case undefined: {
        /**
         * WebSocket is not instantiated. Store the message to the _messageCache
         * and send it after the WebSocket open. Then invoke the createWebSocket method.
         *
         */
        if (
          message !== this.$options.heartbeatMessage &&
          this.$options.enableMessageCache
        ) {
          this.cacheMessage(message)
        }
        this.createWebSocket()
        break
      }
      case WebSocket.CONNECTING: {
        /**
         * WebSocket is connecting. Store the message to the _messageCache
         * and send it after the WebSocket open.
         *
         */
        if (
          message !== this.$options.heartbeatMessage &&
          this.$options.enableMessageCache
        ) {
          this.cacheMessage(message)
        }
        break
      }

      case WebSocket.OPEN: {
        // WebSocket is connected and send the message directly.
        if (message === this.$options.heartbeatMessage) {
          console.log(`Heartbeat check at ${getTime()}.`)
          this.ws!.send(JSON.stringify(message))
          break
        }

        const index = this._messageCache.indexOf(message)
        if (index !== -1) {
          // 如果该msg在messageCache内，则从messageCache中删除该msg
          this._messageCache.splice(index, 1)
        }
        if (
          message instanceof Blob ||
          message instanceof ArrayBuffer ||
          isArrayBufferView(message)
        ) {
          this.ws!.send(message)
        } else {
          this.ws!.send(JSON.stringify(message))
        }
        break
      }
      default: {
        /**
         * TODO: Do not store the message if this.wasClean is true
         * Store the message to the _messageCache
         * and send it after the WebSocket is reconnected.
         */
        if (
          message !== this.$options.heartbeatMessage &&
          this.$options.enableMessageCache
        ) {
          this.cacheMessage(message)
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
  close(code?: number, reason?: string): void {
    this.ws?.close(code, reason)
    this.heartbeat.stopCheck()
  }

  private _init() {
    Object.defineProperties(this, {
      readyState: {
        enumerable: true,
        get: function () {
          return this.ws?.readyState
        }
      },
      status: {
        enumerable: true,
        get: function () {
          return this.readyState >= 0
            ? this.constructor.STATUS[this.readyState]
            : 'UNCREATE'
        }
      },
      onopen: {
        enumerable: true,
        get: function () {
          return this.ws?.onopen
        },
        set: function (fn) {
          ;(this.ws && (this.ws.onopen = fn)) || (this.$options.onopen = fn)
        }
      },
      onmessage: {
        enumerable: true,
        get: function () {
          return this.ws?.onmessage
        },
        set: function (fn) {
          ;(this.ws && (this.ws.onmessage = fn)) ||
            (this.$options.onmessage = fn)
        }
      },
      onclose: {
        enumerable: true,
        get: function () {
          return this.ws?.onclose
        },
        set: function (fn) {
          ;(this.ws && (this.ws.onclose = fn)) || (this.$options.onclose = fn)
        }
      },
      onerror: {
        enumerable: true,
        get: function () {
          return this.ws?.onerror
        },
        set: function (fn) {
          ;(this.ws && (this.ws.onerror = fn)) || (this.$options.onerror = fn)
        }
      }
    })
  }
}
