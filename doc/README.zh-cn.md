# websocket-client

## 简介

> 一个小众的轻量级的WebSocket库

websocket-client是一个运行在浏览器环境中的轻量级的Javascript库。
其本质是在原生的WebSocket对象上做了一层简单包装以使其可以提供一些常用的例如心跳检测、异常断开时自动重连等逻辑。
在致力于使程序可以更健壮的运行的同时，赋予其和原生WebSocket相似的特性。（例如：注册事件，readyState状态等）  
websocket-client在原生WebSocket的基础上主要增加了如下功能：
- 异常断开时自动重连
- 当和服务端建立连接失败时，可以指定自动重连次数和连接的时间间隔
- 非OPEN状态时发送的消息会被缓存，待成功连接后会以间隔100ms的时间间隔按缓存顺序依次发送
- 心跳检测机制
- [EventHub](#eventhub)机制（类似Vuejs中的event bus）

## 浏览器兼容性
各浏览器版本支持：
- chrome >= 43
- firefox >= 19
- ie >= 10
- safari >= 10
- edge >= 12
- opera >= 30
- android >= 4.4
- ios >= 10

## 安装
npm
```Command Line
npm i websocket-client -S
```
or yarn
```Command Line
yarn add websocket-client
```

## 用法

在传统页面中使用 `script` 标签引用：

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

工程化项目中以 `es module` 方式引用:

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
- 参数：

    - `{string} url` 要连接的URL。
    - `{object} options` 创建实例时的参数配置，详查[options](#options)。
    
- 用法：

    创建连接。

### socketClient.close([code, reason])
- 参数：

    - `{number} code` 一个数字状态码，它解释了连接关闭的原因。默认：1005
    - `{string} reason` 一个人类可读的字符串，它解释了连接关闭的原因。这个UTF-8编码的字符串不能超过123个字节。
    
- 用法：

    关闭WebSocket连接或连接尝试（如果有）。如果连接已经被关闭，则此方法不执行任何操作。
    
- 抛出的异常

    - `INVALID_ACCESS_ERR`  
    一个无效的`code`
    - `SYNTAX_ERR`  
    `reason`字符串太长（超过123字节）

### socketClient.send(data)
- 参数：

    - {string | Blob | ArrayBuffer | ArrayBufferView | Object} data
    
- 用法：

    向服务器发送数据。当`data`为除`Blob`/`ArrayBuffer`/`ArrayBufferView`之外的Object时，在发送前会先进行`JSON.stringify(data)`处理后再发送。
    
- 示例：
```javascript
var data = { username: 'jhail', age: 18}
socketClient.send(data) // 同 socketClient.send('{"username":"jhail","age":18}')
```

### socketClient.on( event, callback )
- 参数：

    - {string | Array<string>} event
    - {Function} callback
    
- 用法：

    监听当前实例上的自定义事件。事件可以由`socketClient.trigger`触发。回调函数会接收所有传入事件触发函数的额外参数。
    默认情况下，当接收到消息时，socketClient会自动触发接收到的data中的`message`属性值对应的事件。
    `message`的配置参考[options[message]](#options)。
    
- 示例：
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
- 参数：

    - {string} event
    - {Function} callback
    
- 用法：

    监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
    
- 示例：

```javascript
socketClient.once('once', function(msg) {
    console.log(msg)
})
socketClient.trigger('once', 'Hi')
// "Hi"
socketClient.trigger('once', 'Hi') // 再次触发时，不会再输出 "Hi"
```


### socketClient.off( [event, callback] )
- 参数：

    - {string | Array<string>} event
    - {Function} [callback]
    
- 用法：

    移除自定义事件监听器。

    - 如果没有提供参数，则移除所有的事件监听器；
    - 如果只提供了事件，则移除该事件所有的监听器；
    - 如果同时提供了事件与回调，则只移除这个回调的监听器。

### socketClient.trigger( eventName, […args] )
- 参数：

    - {string} eventName
    - [...args]
    
- 用法：
  
    触发当前实例上的事件。附加参数都会传给监听器回调。

- 示例：

```javascript
socketClient.on('messages', function(a, b) {
    console.log(a + b)
})
socketClient.trigger('messages', 'Hello ', 'World')
// "Hello World"
```


## options

| 参数                           | 类型                                                       | 默认值 | 说明                                                         |
| ------------------------------ | ---------------------------------------------------------- | --------- | ------------------------------------------------------------ |
| connectImmediately             | boolean                                                    | true      | 在创建WebSocketClient实例的时候是否立即开始与服务端建立连接。当设置为`false`时，可以在需要时通过`socketClient.createWebSocket()`建立连接 |
| enableDefaultEventHandler      | boolean                                                    | true      | 是否启用默认的事件处理函数。默认的事件处理函数旨在提供心跳检测、异常断开重连、输出相关日志等功能，且不会影响你注册的`onopen`、`onmessage`、`onclose`、`onerror`这些事件。 |
| connectLogSilent               | boolean                                                    | false     | 建立连接相关的日志                                           |
| eventLogSilent                 | boolean                                                    | false     | 当`onopen`、`onclose`、`onerror`事件被触发时的日志           |
| maxReconnectTimes              | number                                                     | 3         | 当连接失败时，连续尝试重连的次数。                           |
| reconnectTimeInterval          | number                                                     | 30000     | 当连接失败时，连续尝试重连的时间间隔。                       |
| immediateReconnectTimeInterval | number                                                     | 2000      | 当连接异常关闭时，尝试再次连接的时间间隔。                   |
| enableMessageCache             | boolean                                                    | false     | 是否启用消息缓存机制。当设置为`true`时，在websocket的readyState为非OPEN状态期间发送的消息会被缓存，待状态为OPEN时，以间隔100ms的时间间隔按缓存顺序依次发送 |
| message                        | string                                                     | 'message' | 指定消息类型为消息对象的某个属性 |
| heartbeatPeriod                | number                                                     | 50000     | 心跳检测的周期。单位：毫秒                                   |
| heartbeatMessage               | string \| object \| Blob \| ArrayBuffer \| ArrayBufferView | "ping"    | 心跳检测时发送的消息。                                       |
| heartbeatLogSilent             | boolean                                                    | false     | 心跳检测的消息发送时的时间日志。                             |

## EventHub

EventHub 旨在为用户提供一种更方便更灵活的方式来处理服务端推送过来的消息。为此特提供了EventHub接口供用户独立引用。

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
同[socketClient.on( event, callback )](#socketclienton-event-callback-)

####  eventHub.once( event, callback )
同[socketClient.once( event, callback )](#socketclientonce-event-callback-)

####  eventHub.off( [event, callback] )
同[socketClient.off( [event, callback] )](#socketclientoff-event-callback-)

####  eventHub.trigger( eventName, […args] )
同[socketClient.trigger( eventName, […args] )](#socketclienttrigger-eventname-args-)
