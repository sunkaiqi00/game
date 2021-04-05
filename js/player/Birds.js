import Sprite from '../base/Sprite.js'
import { screen_height, screen_width } from '../constant.js'

// 小鸟类
export default class Birds extends Sprite {
  constructor() {
    const image = Sprite.getImage('birds')
    super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)

    // 数组存储小鸟的三种状态(三张图片)
    // 小鸟的宽度是34，小鸟的高度是24, 上下边距是10, 小鸟的左右编剧是9

    // 每张图片的X轴
    this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18]
    // 每张图片的Y轴
    this.clippingY = [10, 10, 10]
    // 每张图片的宽度，高度
    this.clippingWidth = [34, 34, 34]
    this.clippingHeight = [24, 24, 24]
    // 初始小鸟X轴坐标
    this.birdX = screen_width / 4
    this.birdsX = [this.birdX, this.birdX, this.birdX]
    // 初始小鸟Y轴坐标
    const birdY = screen_height / 2
    this.birdsY = [birdY, birdY, birdY]
    // 小鸟宽度
    const birdWidth = 34
    this.birdsWidth = [birdWidth, birdWidth, birdWidth]
    // 小鸟高度
    const birdHeight = 24
    this.birdsHeight = [birdHeight, birdHeight, birdHeight]
    // 三只小鸟Y轴坐标
    this.y = [birdY, birdY, birdY]
    // 当前第几只小鸟
    this.index = 0
    // 计数器
    this.count = 0
    this.time = 0
  }
  draw() {
    // 切换小鸟的速度
    const speed = 0.2
    this.count += speed
    // 0, 1, 2
    if (this.index >= 2) {
      this.count = 0
    }
    // 切换图片
    this.index = Math.floor(this.count)

    // 小鸟自然下落
    // 重力G
    const g = 0.98 / 2.5
    // 向上偏移一段距离
    const offsetUp = 30
    // 小鸟的Y轴位移
    const offsetY = (g * this.time * (this.time - offsetUp)) / 2
    for (let i = 0; i < this.birdsY.length; i++) {
      this.birdsY[i] = this.y[i] + offsetY
    }
    this.time++

    super.draw(
      this.img,
      this.clippingX[this.index],
      this.clippingY[this.index],
      this.clippingWidth[this.index],
      this.clippingHeight[this.index],
      this.birdsX[this.index],
      this.birdsY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index]
    )
  }
}
