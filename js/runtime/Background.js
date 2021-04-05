import Sprite from '../base/Sprite.js'
import { screen_width, screen_height } from '../constant.js'

// 背景
export default class Background extends Sprite {
  constructor() {
    // canvas 背景图
    const image = Sprite.getImage('background')
    super(image, 0, 0, image.width, image.height, 0, 0, screen_width, screen_height)
  }
}
