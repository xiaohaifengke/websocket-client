# websocket-client([中文文档](./doc/README.zh-cn.md))

## Summary

> A lightweight js lib for websocket.

websocket-client is a lightweight Javascript library running in a browser environment.
Essentially, its instance wrapped around the native WebSocket so that it can provide some commonly used logic(e.g. hearbeat detection).
Give programs similar behaviour to native WebSocket while working to make them more robust. (e.g. registration event, readyState property, etc.) 
The following functions is provided for websocket-client:
- automatic reconnection when an exception closed.
- you can specify the number of automatic reconnections and the interval between connections when connect to the server failed.
- cache sent failed messages and send in cached order at 100 ms intervals when the websocket reconnects.
- hearbeat detection
- [EventHub](#eventhub) mechanism

## Browser Compatibility
Browser versions：
- chrome >= 43
- firefox >= 19
- ie >= 10
- safari >= 10
- edge >= 12
- opera >= 30
- android >= 4.4
- ios >= 10

[comment]:(TODO:)
[comment]:(chrome--16--readyState(not))
[comment]:(firefox--11--readyState(not))
[comment]:(safari--7--readyState(not))
[comment]:(ie--16)
[comment]:(edge--12)
[comment]:(opera--12.1--readyState(not))
[comment]:(ios--6--readyState(not))
[comment]:(https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#Browser_compatibility)

## Install
npm
```Command Line
npm i websocket-client -S
```
or yarn
```Command Line
yarn add websocket-client
```

## Usage

Use in the browser environment like:

```html
<script src="./websocket-client.js"></script>
<script >
    var socket = new WS.WebSocketClient('ws://xxx.com/api/ws', {
        immediateReconnectTimeInterval: 2000,
        heartbeatPeriod: 50000,
        heartbeatMessage: 'ping'
    });
</script>
```

es module:

```javascript
import WebSocketClient from 'websocket-client'
// or
// import { WebSocketClient } from 'websocket-client'

const socket = new WebSocketClient('ws://xxx.com/api/ws', {
    immediateReconnectTimeInterval: 2000,
    heartbeatPeriod: 50000,
    heartbeatMessage: 'ping'
})
socket.onopen = function() {
    console.log('open')
}

socket.onmessage = function(e) {
    console.log('message', e.data)
}

socket.onclose = function() {
    console.log('close')
}

socket.onerror = function(e) {
    console.error(e)
}
```

## API

### new WebSocketClient(url[, options])
- Arguments：

    - `{string} url` The URL to which to connect.
    - `{object} options` see also [options](#options)。
    
- Usage：

    Create a `WebSocketClient` instance and connect to server.

### socketClient.close([code, reason])
- Arguments：

    - `{number} code`
    A numeric value indicating the status code explaining why the connection is being closed.
    Default: `1005`
    - `{string} reason`
    A human-readable string explaining why the connection is closing.
    This string must be no longer than 123 bytes of UTF-8 text (not characters).
    
- Usage：

    Closes the `WebSocket` connection or connection attempt, if any. 
    If the connection is already `CLOSED`, this method does nothing.
    
- Exceptions thrown

    - `INVALID_ACCESS_ERR`
    An invalid `code` was specified.
    - `SYNTAX_ERR`
    The `reason` string is too long or contains unpaired surrogates.

### socketClient.send(data)
- Arguments：

    - {string | Blob | ArrayBuffer | ArrayBufferView | Object} data
    
- Usage：

    Enqueues the specified data to be transmitted to the server over the WebSocket connection,
    increasing the value of `bufferedAmount` by the number of bytes needed to contain the data.
    If the data can't be sent (for example, because it needs to be buffered but the buffer is full),
    the socket is closed automatically.
    
    > Tips: if `data` is a plain object, it will be converted to `JSON` before sending.
    
- Example：
```javascript
var data = { username: 'jhail', age: 18}
socketClient.send(data) // the same as socketClient.send('{"username":"jhail","age":18}')
```

### socketClient.on( event, callback )
- Arguments：

    - {string | Array<string>} event
    - {Function} callback
    
- Usage：

    Listen for a custom event on the current instance(`socketClient`).
    Events can be triggered by `socketClient.trigger`. 
    The callback will receive all the additional arguments passed into these event-triggering methods.
    
    By default, when a message is received,
    the socketClient automatically triggers events corresponding to `message` property values in the received data.
    
    See also [options[message]](#options).
    
- Example：
```javascript
socketClient.on('message', function(msg) {
    console.log(msg)
})
socketClient.trigger('message', 'Hi')
// "Hi"
socketClient.trigger('message', 'Hi')
// "Hi"
```

### socketClient.once( event, callback )
- Arguments：

    - {string} event
    - {Function} callback
    
- Usage：

    Listen for a custom event, but only once. The listener will be removed once it triggers for the first time.
    
- Example：
```javascript
socketClient.once('once', function(msg) {
    console.log(msg)
})
socketClient.trigger('once', 'Hi')
// "Hi"
socketClient.trigger('once', 'Hi') //  If triggered again, no more output "Hi".
```


### socketClient.off( [event, callback] )
- Arguments：

    - {string | Array<string>} event
    - {Function} [callback]
    
- Usage：

    Remove custom event listener(s).
    
    - If no arguments are provided, remove all event listeners;
    - If only the event is provided, remove all listeners for that event;
    - If both event and callback are given, remove the listener for that specific callback only.

### socketClient.trigger( eventName, […args] )
- Arguments：

    - {string} eventName
    - [...args]
    
- Usage：
  
    Trigger an event on the current instance.
    Any additional arguments will be passed into the listener’s callback function.

- Example：
```javascript
socketClient.on('messages', function(a, b) {
    console.log(a + b)
})
socketClient.trigger('messages', 'Hello ', 'World')
// "Hello World"
```


## options

| Attribute                      | Type                                                       | Default   | Description                                                  |
| ------------------------------ | ---------------------------------------------------------- | --------- | ------------------------------------------------------------ |
| connectImmediately             | boolean                                                    | true      | sometimes we don't need to start connecting to the server immediately when we create WebSocketClient instances. When set to `false`, you can establish connections through `socketClient.createWebSocket()` when needed . |
| enableDefaultEventHandler      | boolean                                                    | true      | whether to enable the default event handler function. Default event handling functions are designed to provide heartbeat detection, automatic reconnection when an exception closed, etc.  The default event handler function do not affect the `onopen`、`onmessage`、`onclose`、`onerror` of these events you register. |
| connectLogSilent               | boolean                                                    | false     | connection-related logs.                                     |
| eventLogSilent                 | boolean                                                    | false     | logs when `onopen`、`onclose`、`onerror` event is triggered. |
| maxReconnectTimes              | number                                                     | 3         | the number of attempts to reconnect when the connection fails. |
| reconnectTimeInterval          | number                                                     | 30000     | the time interval before trying to reconnect when the connection fails. |
| immediateReconnectTimeInterval | number                                                     | 2000      | the time interval for trying to reconnect when the connection is abnormally closed. |
| enableMessageCache             | boolean                                                    | false     | whether to enable the message cache mechanism. when set to `true`, it will be cache all sent failed messages and send in cached order at intervals of 100 ms when the websocket reconnects. |
| message                        | string                                                     | 'message' | specify which key of message object is used as the message type. |
| heartbeatPeriod                | number                                                     | 50000     | cycle of heartbeat detection. In milliseconds                |
| heartbeatMessage               | string \| object \| Blob \| ArrayBuffer \| ArrayBufferView | "ping"    | the message of heartbeat detection.                          |
| heartbeatLogSilent             | boolean                                                    | false     | time log of heartbeat detection.                             |

## EventHub

EventHub is designed to provide users with a more convenient and flexible way to handle received messages.
For this purpose, an EventHub API is provided for users to import independently.

### Demo

```javascript
// util.js
import { EventHub } from 'websocket-client'
export const eventHub = new EventHub()

// somewhere.js
import { eventHub } from 'util.js'
eventHub.on('message', ( param ) => {
    console.log(param)
})

// websocket.js
import WebSocketClient from 'websocket-client'
import { eventHub } from 'util'

const socket = new WebSocketClient('ws://xxx.com/api/ws', {
    immediateReconnectTimeInterval: 2000,
    heartbeatPeriod: 50000,
    heartbeatMessage: 'ping'
})

socket.onmessage = function(e) { 
  const data = e.data
  eventHub.trigger(data.message, data)
}
```

### EventHub API

####  eventHub.on(event, callback)
See also [socketClient.on( event, callback )](#socketclienton-event-callback-)

####  eventHub.once( event, callback )
See also [socketClient.once( event, callback )](#socketclientonce-event-callback-)

####  eventHub.off( [event, callback] )
See also [socketClient.off( [event, callback] )](#socketclientoff-event-callback-)

####  eventHub.trigger( eventName, […args] )
See also [socketClient.trigger( eventName, […args] )](#socketclienttrigger-eventname-args-)

