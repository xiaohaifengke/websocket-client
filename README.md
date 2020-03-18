> A lightweight js lib for websocket.

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
    })
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
```

## TODO
1. use typescript
2. 
