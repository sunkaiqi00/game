import Sprite from '../base/Sprite.js'
import { screen_height, screen_width } from '../constant.js'

// 开始按钮
export default class StartButton extends Sprite {
  constructor() {
    const image = Sprite.getImage('startButton')
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      (screen_width - image.width) / 2,
      (screen_height - image.height) / 2.5,
      image.width,
      image.height
    )
  }
}
