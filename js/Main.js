import DateStore from './base/DateStore.js'
import ReourceLoader from './base/ResourceLoader.js'
import Director from './Director.js'
import Birds from './player/Birds.js'
import Score from './player/Score.js'
import StartButton from './player/StartButton.js'
import Background from './runtime/Background.js'
import Land from './runtime/Land.js'
import PopModal from './runtime/PopModal.js'

// 初始化整个游戏的精灵 作为游戏开始的入口
export default class Main {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dateStore = DateStore.getInstance()
    this.director = Director.getInstance()

    const loader = ReourceLoader.create()
    loader.onLoaded(map => this.onReourceFirstLOaded(map))
  }
  onReourceFirstLOaded(map) {
    this.dateStore.ctx = this.ctx
    this.dateStore.res = map
    this.initCanvas()
    this.initBackground()
    this.initPopModal()
  }
  init() {
    // 游戏是否结束
    this.director.isGameOver = false
    this.dateStore
      .add('ctx', this.ctx)
      .add('background', Background)
      .add('land', Land)
      .add('pencils', [])
      .add('birds', Birds)
      .add('startButton', StartButton)
      .add('score', Score)

    // 游戏运行之前 创建铅笔
    this.director.createPencil()
    // 运行游戏
    this.director.run()
    this.bindEvent()
  }
  // 点击事件
  bindEvent() {
    this.canvas.addEventListener('touchstart', e => {
      if (this.director.isGameOver) {
        console.log('游戏开始')
        this.init()
      } else {
        this.director.birdsEvent()
      }
    })
  }

  initCanvas() {
    this.canvas.setAttribute('width', window.innerWidth)
    this.canvas.setAttribute('height', window.innerHeight)
  }
  initPopModal() {
    const modal = PopModal.getInstance()
    modal.initContent({
      title: '游戏规则',
      content: '不断点击屏幕，不要触碰到铅笔，穿越铅笔获得分数',
      confirmBtn: '开始游戏'
    })
    modal.onConfirm(() => {
      console.log('开始游戏')
      this.init()
      modal.hide()
      // 背景音乐
      modal.modal.addEventListener('click', () => {
        const audio = document.getElementsByClassName('background-audio')[0]
        audio.play()
      })
      modal.modal.click()
    })
  }
  initBackground() {
    // 先初始化背景
    const backgroundImage = new Image()
    backgroundImage.src = 'images/background.png'
    new Background(backgroundImage).draw()
  }
}
