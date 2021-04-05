export default class PopModal {
  constructor() {
    this.modal = document.getElementsByClassName('popmenu-wrapper')[0]
    this.data = {
      title: this.modal.getElementsByClassName('game-title')[0],
      content: this.modal.getElementsByClassName('game-content')[0],
      confirmBtn: this.modal.getElementsByClassName('confirm')[0]
    }
  }
  initContent(data) {
    for (const key in data) {
      this.data[key].innerText = data[key]
    }
  }
  onConfirm(callback) {
    this.data['confirmBtn'].addEventListener('click', e => {
      callback && callback()
    })
  }
  hide() {
    this.modal.style.display = 'none'
  }
  show() {
    this.modal.style.display = 'block'
  }
  static getInstance() {
    if (!PopModal.instance) {
      PopModal.instance = new PopModal()
    }
    return PopModal.instance
  }
}
