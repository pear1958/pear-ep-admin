// 心跳基类
export class Heart {
  timeout = 30000

  // 心跳计时器
  // @ts-ignore
  HEART_TIMEOUT: NodeJS.Timer

  // 重置
  reset() {
    clearInterval(this.HEART_TIMEOUT)
    return this
  }

  /**
   * 启动心跳
   * @param {Function} cb 回调函数
   */
  start(cb: (...args: any[]) => any) {
    this.HEART_TIMEOUT = setInterval(() => {
      cb()
    }, this.timeout)
  }
}
