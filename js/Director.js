import DateStore from './base/DateStore.js'
import { screen_width } from './constant.js'
import DownPencil from './runtime/DownPencil.js'
import UpPencil from './runtime/UpPencil.js'
import PopModal from './runtime/PopModal.js'
import { close } from './utils/close.js'

// 导演类 控制整体动画
export default class Director {
  constructor() {
    this.dateStore = DateStore.getInstance()
    // 移动速度
    this.speed = 2
    this.createAudio()
  }
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
  createPencil() {
    // 铅笔距离顶部最小距离
    const minTop = screen_width / 7
    // 铅笔距离顶部最大距离
    const maxTop = screen_width / 3
    // 随机获取铅笔高度
    const top = minTop + Math.random() * (minTop + maxTop)
    // 创建一对上下铅笔
    this.dateStore.get('pencils').push(new UpPencil(top))
    this.dateStore.get('pencils').push(new DownPencil(top))
  }
  // 小鸟飞的高度
  birdsEvent() {
    const birds = this.dateStore.get('birds')
    for (let i = 0; i <= 2; i++) {
      birds.y[i] = birds.birdsY[i]
    }
    birds.time = 0
  }
  // 游戏是否结束
  check() {
    this.ground()
    this.impactPencil()
    this.addScore()
  }
  // 加分
  addScore() {
    const birds = this.dateStore.get('birds')
    const pencils = this.dateStore.get('pencils')
    const score = this.dateStore.get('score')
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isAddScore) {
      score.isAddScore = false
      this.audio.play()
      score.scoreNumber += 5
    }
  }
  // 小鸟是否撞击到铅笔
  impactPencil() {
    const birds = this.dateStore.get('birds')
    const pencils = this.dateStore.get('pencils')

    // 小鸟四个边距
    const birdsBorder = {
      top: birds.y[0],
      right: birds.birdsX[0] + birds.birdsWidth[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0]
    }
    // 每个铅笔的四个边距
    for (let i = 0; i < pencils.length; i++) {
      const pencil = pencils[i]
      const pencilBorder = {
        top: pencil.y,
        right: pencil.x + pencil.width,
        bottom: pencil.y + pencil.height,
        left: pencil.x
      }
      if (Director.isImpact(birdsBorder, pencilBorder)) {
        this.isGameOver = true
        console.log('小鸟撞击到铅笔')
        return
      }
    }
  }
  // 小鸟是否落地
  ground() {
    const birds = this.dateStore.get('birds')
    const land = this.dateStore.get('land')
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true
      return
    }
  }
  run() {
    this.check()
    if (!this.isGameOver) {
      // 保证屏幕内始终有两对(四只)铅笔
      const pencils = this.dateStore.get('pencils')
      // 如果第一个铅笔的左边距消失在canvas范围上 并且当前有四肢铅笔 把第一组的铅笔删除
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        // 小鸟越过第一组铅笔 开启可加分控制
        this.dateStore.get('score').isAddScore = true
      }
      // 第一组铅笔删除后的第一个铅笔的左边距小于等于canvas宽度一半 并且当前只有一组铅笔 创建一组铅笔
      if (pencils[0].x <= (screen_width - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil()
      }
      // canvas背景绘制
      this.dateStore.get('background').draw()
      // 先绘制铅笔 陆地覆盖铅笔
      this.dateStore.get('pencils').forEach(pencil => {
        pencil.draw()
      })
      // 陆地绘制
      this.dateStore.get('land').draw()
      // 小鸟绘制
      this.dateStore.get('birds').draw()
      // 分数绘制
      this.dateStore.get('score').draw()
      const timer = requestAnimationFrame(() => {
        this.run()
      })
      this.dateStore.add('requestAnimation_Timer', timer)
    } else {
      console.log('gameover')
      // 游戏结束 显示开始按钮
      this.dateStore.get('startButton').draw()
      cancelAnimationFrame(this.dateStore.get('requestAnimation_Timer'))
      this.dateStore.destroy()
      this.initPopModal()
    }
  }
  static isImpact(bird, pencil) {
    let pass = false
    if (
      bird.top > pencil.bottom ||
      bird.bottom < pencil.top ||
      bird.right < pencil.left ||
      bird.left > pencil.right
    ) {
      pass = true
    }
    return !pass
  }
  createAudio() {
    this.audio = document.createElement('audio')
    document.body.appendChild(this.audio)
    this.audio.style.display = 'none'
    this.audio.src = 'audio/surprised.mp3'
  }
  initPopModal() {
    const modal = PopModal.getInstance()
    modal.show()
    modal.initContent({
      title: '游戏得分',
      content: this.dateStore.get('score').scoreNumber,
      cancelBtn: '退出游戏',
      confirmBtn: '重新开始'
    })
    modal.onCancel(() => {
      console.log('退出游戏')
      close()
    })
    modal.onConfirm(() => {
      console.log('重新开始游戏')
      Director.getInstance().birdsEvent()
    })
  }
}
