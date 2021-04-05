// 变量缓存器 方便在不同的类中访问和修改变量
export default class DateStore {
  constructor() {
    this.map = new Map()
  }
  static getInstance() {
    if (!DateStore.instance) {
      DateStore.instance = new DateStore()
    }
    return DateStore.instance
  }
  add(key, value) {
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    return this
  }
  get(key) {
    return this.map.get(key)
  }
  destroy() {
    for (let value of this.map.values()) {
      value = null
    }
  }
}
