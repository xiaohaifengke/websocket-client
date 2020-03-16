import { Heartbeat } from './heartbeat'
import { isPromise, getTime } from './util'

const defaultOptions = {
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
}

export class WebSocketClient {
    // eslint-disable-next-line
    static STATUS = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']

    /**
     * WebSocketClient constructor
     * @param { number }  heartbeatPeriod    心跳周期(ms)                              default: 50000
     * @param { boolean}  connectImmediately WebSocketClient实例化后是否立即连接服务端    default: false
     * @param { string | object }  heartbeatMessage   心跳检测时向服务端发送的消息        default: 'ping'
     */
    constructor (url, options = {}) {
        this.url = url
        this.options = options
        this.defaultOptions = { ...defaultOptions }
        this.$options = { ...this.defaultOptions, ...options }
        this.wasClean = null // Boolean. 是否正常断开。一般异常断开时，该值为false
        this.reconnectTimes = 0 // 第n次重连的flag
        this._messageCache = []
        if (this.$options.connectImmediately) this.createWebSocket(url)
        this.heartbeat = new Heartbeat(this, {
            message: this.$options.heartbeatMessage,
            period: this.$options.heartbeatPeriod
        })
        this._init()
    }

    createWebSocket () {
        if ('WebSocket' in window) {
            if (this.readyState === undefined || this.readyState === WebSocket.CLOSED) {
                this.ws = new WebSocket(this.url)
                if (this.$options.defaultEventHandler) this.initEventsHandler()
            }
        } else {
            alert('WebSocket is not supported in your browser!')
        }
    }

    reconnectWebSocket (times = 0, interval = this.defaultOptions.reconnectTimeInterval) {
        if (times < this.$options.maxReconnectTimes) {
            if (!this.$options.connectLogSilent) {
                console.log(`Try to reconnect the WebSocket after ${interval / 1000} seconds.`)
            }
            setTimeout((t) => {
                if (!this.$options.connectLogSilent) {
                    console.log(`${t + 1}th attempt to reconnect to webSocket server.`)
                }
                this.reconnectTimes++
                this.createWebSocket()
            }, interval, times)
        } else {
            if (!this.$options.connectLogSilent) {
                console.error(`Could not create connection to websocket server. Attempted reconnect ${this.$options.maxReconnectTimes} times. Giving up!`)
            }
        }
    }

    initEventsHandler () {
        this.ws.addEventListener('open', () => {
            if (!this.$options.eventLogSilent) {
                console.log(`The Websocket has opened at ${getTime()}.`)
            }
            this.wasClean = null
            this.reconnectTimes = 0 // 重连后重置
            this.heartbeat.recheck() // 心跳检测
            this.sendCachedMessage()
        })
        this.ws.addEventListener('message', (event) => {
            this.heartbeat.recheck() // 心跳检测
            const data = JSON.parse(event.data)
            this.trigger(data.message, data)
        })
        this.ws.addEventListener('close', (event) => {
            this.wasClean = !!event.wasClean
            if (this.wasClean) {
                if (!this.$options.eventLogSilent) {
                    console.log(`The WebSocket connection has been closed normally at ${getTime()}.`, event)
                }
            } else {
                if (!this.$options.eventLogSilent) {
                    console.error(`closed at ${getTime()}.`, event)
                }
                this.reconnectWebSocket(this.reconnectTimes,
                    this.reconnectTimes > 0 ? this.$options.reconnectTimeInterval : this.$options.immediateReconnectTimeInterval)
            }
            this.heartbeat.stopCheck() // 关闭后停止心跳检测
        })
        this.ws.addEventListener('error', (error) => {
            if (!this.$options.eventLogSilent) {
                console.error(`The WebSocket connection has been closed due to an error at ${getTime()}.`, error)
            }
        })
    }

    cacheMessage (message) {
        const index = this._messageCache.indexOf(message)
        if (index === -1) {
            this._messageCache.push(message)
        }
    }

    sendCachedMessage () {
        if (this._messageCache.length === 0) return
        const msg = this._messageCache.shift()
        this.send(msg)
        setTimeout(() => {
            this.sendCachedMessage()
        }, 100)
    }

    /**
     * 1. 判断当前websocket的连接状态为OPEN状态时发送消息
     * 2. TODO: 当非OPEN状态时，判断是否为正常断开。只有当websocket为异常断开时，才存储信息
     * @param { object } message
     */
    send (message) {
        switch (this.readyState) {
            case undefined: {

                /**
                 * WebSocket is not instantiated. Store the message to the messageCache
                 * and send it after the WebSocket open. Then invoke the createWebSocket method.
                 *
                 */
                if (message !== this.$options.heartbeatMessage) {
                    this.cacheMessage(message)
                }
                this.createWebSocket()
                break
            }
            case WebSocket.CONNECTING: {

                /**
                 * WebSocket is connecting. Store the message to the messageCache
                 * and send it after the WebSocket open.
                 *
                 */
                if (message !== this.$options.heartbeatMessage) {
                    this.cacheMessage(message)
                }
                break
            }


            case WebSocket.OPEN: { // WebSocket is connected and send the message directly.
                if (message === this.$options.heartbeatMessage) {
                    console.log(`Heartbeat check at ${getTime()}.`)
                    break
                }

                const index = this._messageCache.indexOf(message)
                if (index !== -1) { // 如果该msg在messageCache内，则从messageCache中删除该msg
                    this._messageCache.splice(index, 1)
                }
                this.ws.send(JSON.stringify(message))
                break
            }
            default: {

                /**
                 * TODO: Do not store the message if this.wasClean is true
                 * Store the message to the messageCache
                 * and send it after the WebSocket is reconnected.
                 */
                if (message !== this.$options.heartbeatMessage) {
                    this.cacheMessage(message)
                }
            }
        }
    }

    close () {
        this.ws?.close()
    }

    _init () {
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
                    return this.readyState >= 0 ? this.constructor.STATUS[this.readyState] : 'UNCREATE'
                }
            },
            onopen: {
                enumerable: true,
                get: function () {
                    return this.ws?.onopen
                },
                set: function (fn) {
                    this.ws && (this.ws.onopen = fn)
                }
            },
            onmessage: {
                enumerable: true,
                get: function () {
                    return this.ws?.onmessage
                },
                set: function (fn) {
                    this.ws && (this.ws.onmessage = fn)
                }
            },
            onclose: {
                enumerable: true,
                get: function () {
                    return this.ws?.onclose
                },
                set: function (fn) {
                    this.ws && (this.ws.onclose = fn)
                }
            },
            onerror: {
                enumerable: true,
                get: function () {
                    return this.ws?.onerror
                },
                set: function (fn) {
                    this.ws && (this.ws.onerror = fn)
                }
            }
        })
    }

    on (event, func) {
        if (!this._events) this._events = Object.create(null)
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.on(event[i], func)
            }
        } else {
            (this._events[event] || (this._events[event] = [])).push(func)
        }
        return this
    }

    once (event, func) {
        const $this = this

        function once () {
            $this.off(event, once)
            func.apply($this, arguments)
        }

        once.func = func
        this.on(event, once)
        return this
    }

    off (event, func) {
        // all
        if (!arguments.length) {
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
            this._events[event] = null
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

    trigger (event, ...args) {
        let cbs = this._events[event]
        if (cbs) {
            cbs = [...cbs]
            let res
            for (let i = 0, l = cbs.length; i < l; i++) {
                try {
                    res = cbs[i].apply(this, args)
                    if (res && isPromise(res) && !res._handled) {
                        res.catch(e => console.error(e))
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

export { EventHub } from './util'
export { Heartbeat } from './heartbeat'
export default WebSocketClient