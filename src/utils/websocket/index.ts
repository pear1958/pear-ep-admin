import { Heart } from './heart'

// @ts-ignore || "strictPropertyInitialization": false

interface Options {
  url: string | null // 链接的通道的地址
  heartTime: number // 心跳时间间隔
  heartMsg: string | ArrayBufferLike | Blob | ArrayBufferView // 心跳信息,默认为'ping'
  isRestory: boolean // 是否销毁
  reconnectTime: number // 重连时间间隔
  reconnectCount: number // 重连次数 -1 则不限制
  openCb: ((e: Event) => any) | null // 连接成功的回调
  closeCb: ((e: CloseEvent) => any) | null // 关闭的回调
  messageCb: ((e: MessageEvent) => any) | null // 消息的回调
  errorCb: ((e: Event) => any) | null // 错误的回调
}

export class Socket extends Heart {
  // @ts-ignore
  ws: WebSocket

  // @ts-ignore
  RECONNEC_TTIMER: NodeJS.Timer // 重连计时器

  RECONNECT_COUNT: number = -1 // 变量保存，防止丢失

  OPTIONS: Options = {
    url: null, // 链接的通道的地址
    heartTime: 30000, // 心跳时间间隔
    heartMsg: 'ping', // 心跳信息, 默认为'ping'
    isRestory: false, // 是否销毁
    reconnectCount: -1, // 重连次数 -1 则不限制
    reconnectTime: 0, // 重连时间间隔
    openCb: null, // 连接成功的回调
    closeCb: null, // 关闭的回调
    messageCb: null, // 消息的回调
    errorCb: null // 错误的回调
  }

  constructor(ops: Options) {
    super()
    Object.assign(this.OPTIONS, ops)
    this.create()
  }

  /**
   * 建立连接
   */
  create() {
    if (!('WebSocket' in window)) {
      new Error('当前浏览器不支持，无法使用')
      return
    }
    if (!this.OPTIONS.url) {
      new Error('地址不存在，无法建立通道')
      return
    }
    Reflect.deleteProperty(this, 'ws')
    this.ws = new WebSocket(this.OPTIONS.url)
    this.onopen()
    this.onclose()
    this.onmessage()
  }

  /**
   * 自定义连接成功事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onopen(callback?: (e: Event) => any) {
    this.ws.onopen = event => {
      clearTimeout(this.RECONNEC_TTIMER) // 清除重连定时器

      if (this.OPTIONS.reconnectCount !== -1) {
        this.OPTIONS.reconnectCount = this.RECONNECT_COUNT // 计数器重置
      }

      if (typeof callback === 'function') {
        callback(event)
        // 缓存 回调函数 flag
        this.OPTIONS.openCb = callback
      } else {
        typeof this.OPTIONS.openCb === 'function' && this.OPTIONS.openCb(event)
      }
    }
  }

  /**
   * 自定义关闭事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onclose(callback?: (e: CloseEvent) => any) {
    this.ws.onclose = event => {
      super.reset()

      !this.OPTIONS.isRestory && this.onreconnect()

      if (typeof callback === 'function') {
        callback(event)
        // 缓存 回调函数 flag
        this.OPTIONS.closeCb = callback
      } else {
        typeof this.OPTIONS.closeCb === 'function' && this.OPTIONS.closeCb(event)
      }
    }
  }

  /**
   * 自定义错误事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onerror(callback?: (e: Event) => any) {
    this.ws.onerror = event => {
      console.log('on-error', event) // for-debug

      if (typeof callback === 'function') {
        callback(event)
        // 缓存 回调函数 flag
        this.OPTIONS.errorCb = callback
      } else {
        typeof this.OPTIONS.errorCb === 'function' && this.OPTIONS.errorCb(event)
      }
    }
  }

  /**
   * 自定义消息监听事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onmessage(callback?: (e: MessageEvent) => any) {
    this.ws.onmessage = event => {
      const data = JSON.parse(event.data)

      // 鉴权成功
      if (data.code === 10030) {
        // 建立心跳机制
        super.start(() => {
          this.send(this.OPTIONS.heartMsg)
        })
      }

      if (typeof callback === 'function') {
        callback(event)
        // 缓存 回调函数 flag
        this.OPTIONS.messageCb = callback
      } else {
        typeof this.OPTIONS.messageCb === 'function' && this.OPTIONS.messageCb(event)
      }
    }
  }

  /**
   * 自定义发送消息事件
   * @param {String} data 发送的文本
   */
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.ws.readyState !== this.ws.OPEN) {
      new Error('没有连接到服务器，无法推送')
      return
    }

    this.ws.send(data)
  }

  /**
   * 断线重连
   */
  onreconnect() {
    if (this.OPTIONS.reconnectCount > 0 || this.OPTIONS.reconnectCount === -1) {
      this.RECONNEC_TTIMER = setTimeout(() => {
        this.create()
        if (this.OPTIONS.reconnectCount !== -1) this.OPTIONS.reconnectCount--
      }, this.OPTIONS.reconnectTime)
    } else {
      clearTimeout(this.RECONNEC_TTIMER)
      // 计数器重置
      this.OPTIONS.reconnectCount = this.RECONNECT_COUNT
    }
  }

  /**
   * 主动销毁
   */
  destroy() {
    super.reset()
    clearTimeout(this.RECONNEC_TTIMER) // 清除重连定时器
    this.OPTIONS.isRestory = true
    this.ws.close()
  }
}
