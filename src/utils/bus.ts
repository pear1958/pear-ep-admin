interface BusClass {
  emit: (name: string) => void
  on: (name: string, callback: Function) => void
  off: (name: string) => void
}

interface EventList {
  [key: string | number | symbol]: Function[]
}

class Bus implements BusClass {
  eventList: EventList

  constructor() {
    this.eventList = {}
  }

  emit(name: string, ...args: any[]) {
    const fnList: Function[] = this.eventList[name] || []

    fnList.forEach((fn) => {
      fn.apply(this, args)
    })
  }

  on(name: string, callback: Function) {
    const fnList: Function[] = this.eventList[name] || []
    fnList.push(callback)
    this.eventList[name] = fnList
  }

  off(name: string) {
    delete this.eventList[name]
  }
}

export default new Bus()
