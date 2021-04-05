import { Resource } from './Resource.js'

// 资源文件加载器 确保canvas在图片资源加载完毕后才进行渲染
export default class ResourceLoader {
  constructor() {
    this.map = new Map(Resource)
    for (let [key, value] of this.map) {
      const image = new Image()
      image.src = value
      this.map.set(key, image)
    }
  }
  onLoaded(callback) {
    let loadedCount = 0
    for (const value of this.map.values()) {
      value.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) {
          callback(this.map)
        }
      }
    }
  }
  static create() {
    return new ResourceLoader()
  }
}
