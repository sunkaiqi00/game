import Sprite from '../base/Sprite.js'
import { screen_width } from '../constant.js'

// 铅笔的父类
export default class Pencil extends Sprite {
  constructor(image, top) {
    super(image, 0, 0, image.width, image.height, screen_width, 0, image.width, image.height)
    this.top = top
    this.movedSpeed = 2
  }
  draw() {
    this.x -= this.movedSpeed
    super.draw(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y,
      this.img.width,
      this.img.height
    )
  }
}
