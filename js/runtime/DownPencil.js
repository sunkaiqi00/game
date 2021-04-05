import Sprite from '../base/Sprite.js'
import Pencil from './Pencil.js'
import { screen_width } from '../constant.js'

// 下面的铅笔
export default class DownPencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilDown')
    super(image, top)
  }
  draw() {
    // 上下铅笔中间的间隔
    const gap = screen_width / 3
    this.y = this.top + gap
    super.draw()
  }
}
