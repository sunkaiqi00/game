import Sprite from '../base/Sprite.js'
import { screen_width, screen_height } from '../constant.js'
import Director from '../Director.js'

// 移动的陆地
export default class Land extends Sprite {
  constructor() {
    // 陆地图片
    const image = Sprite.getImage('land')
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      screen_height - image.height,
      image.width,
      image.height
    )
    // 陆地水平初始坐标
    this.landX = 0
    // 陆地每次移动速度
    this.landSpeed = Director.getInstance().speed
  }
  draw() {
    this.landX += this.landSpeed
    if (this.landX > this.img.width - screen_width) {
      this.landX = 0
    }
    super.draw(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      -this.landX,
      this.y,
      this.width,
      this.height
    )
  }
}
