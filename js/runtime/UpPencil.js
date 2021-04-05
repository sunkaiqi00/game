import Sprite from '../base/Sprite.js'
import Pencil from './Pencil.js'

// 上面的铅笔
export default class UpPencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilUp')
    super(image, top)
  }
  draw() {
    this.y = this.top - this.height
    super.draw()
  }
}
