/*  global alert */

import logger from 'util/logger'

export default class Button {
  constructor (selector) {
    this.element = document.querySelector(selector)
    logger('button created')
  }

  init () {
    this.element.addEventListener('click', this.clicked)
  }

  clicked () {
    const message = 'clicked'
    logger(message)
    alert(message)
  }
}
