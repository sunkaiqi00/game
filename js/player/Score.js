import DateStore from '../base/DateStore.js'
import { screen_height, screen_width } from '../constant.js'

// 分数
export default class Score {
  constructor() {
    this.ctx = DateStore.getInstance().ctx
    this.scoreNumber = 0
    // 是否可以加分
    this.isAddScore = true
  }
  draw() {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = '#ffcbeb'
    this.ctx.textAlign = 'right'
    this.ctx.fillText(this.scoreNumber, screen_width / 2, screen_height / 18, 1000)
  }
}
