/* eslint-disable no-unused-vars */
export interface WSClientOptions {
  connectImmediately: boolean
  enableDefaultEventHandler: boolean
  connectLogSilent: boolean
  eventLogSilent: boolean
  maxReconnectTimes: number
  reconnectTimeInterval: number
  immediateReconnectTimeInterval: number
  enableMessageCache: boolean
  message: string
  heartbeatPeriod: number
  heartbeatMessage: string
  heartbeatLogSilent: boolean
  onopen?: (...args: any[]) => any
  onmessage?: (...args: any[]) => any
  onclose?: (...args: any[]) => any
  onerror?: (...args: any[]) => any
}

export enum StatusText {
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED'
}

export type MessageType = string | Blob | ArrayBuffer

export type CustomEventsHandler = ((...args: any[]) => any) & {
  func?: (...args: any[]) => any
}

export type CustomEvents = {
  [k: string]: Array<CustomEventsHandler>
}
