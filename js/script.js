'use strict'

const title = document.getElementsByTagName('h1')[0]
const btnHandlers = document.getElementsByClassName('handler_btn')
const btnStart = btnHandlers[0]
const btnReset = btnHandlers[1]
const btnPlus = document.querySelector('.screen-btn')
const mainControlsPercent = document.querySelectorAll('.other-items.percent')
const mainControlsNumber = document.querySelectorAll('.other-items.number')
const inputRange = document
  .querySelector('.rollback')
  .querySelector('input[type=range]')
const rangeValue = document
  .querySelector('.rollback')
  .querySelector('span.range-value')
const inputTotalAll = document.getElementsByClassName('total-input')
const inputTotal = inputTotalAll[0]
const inputTotalCount = inputTotalAll[1]
const inputTotalCountOther = inputTotalAll[2]
const inputTotalFullCount = inputTotalAll[3]
const inputTotalCountRollback = inputTotalAll[4]
let screens = document.querySelectorAll('.screen')

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
  },

  getStringFromUser(message, defaultMessage) {
    let string = ''

    do {
      string = prompt(message, defaultMessage)
    } while (this.isNumber(string) || string === null || string.trim() === '')

    return string
  },

  getNumberFromUser(message, defaultMessage) {
    let number = 0

    do {
      number = prompt(message, defaultMessage)
    } while (!this.isNumber(number))

    return parseFloat(number)
  },

  asking() {
    this.title = this.getStringFromUser(
      'Как называется ваш проект?',
      'Калькулятор вёрстки'
    )

    for (let i = 1; i <= 2; i++) {
      const name = this.getStringFromUser(
        'Какие типы экранов нужно разработать?',
        'Простые, Сложные, Интерактивные'
      )
      const price = this.getNumberFromUser(
        'Сколько будет стоить данная работа?',
        ''
      )
      this.screens.push({
        id: i,
        name,
        price,
      })
    }

    for (let i = 1; i <= 2; i++) {
      const name = this.getStringFromUser(
        'Какой дополнительный тип услуги нужен?',
        ''
      )
      const price = this.getNumberFromUser('Сколько это будет стоить?', '')
      this.services[i + ' ' + name] = price
    }

    this.adaptive = confirm('Нужен ли адаптив на сайте?')
  },

  addPrices() {
    this.screenPrice = this.screens.reduce((acc, { price }) => acc + price, 0)
    this.allServicePrices = Object.values(this.services).reduce(
      (acc, price) => acc + price,
      0
    )
  },

  getFullPrice() {
    this.fullPrice = this.screenPrice + this.allServicePrices
  },

  getServicePercentPrices() {
    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    )
  },

  getTitle() {
    let str = this.title.trim()
    this.title = str[0].toUpperCase() + str.slice(1).toLowerCase()
  },

  getRollbackMessage(price) {
    switch (true) {
      case price >= 30000:
        return 'Даем скидку в 10%'
      case 15000 <= price && price < 30000:
        return 'Даем скидку в 5%'
      case 0 <= price && price < 15000:
        return 'Скидка не предусмотрена'
      default:
        return 'Что то пошло не так'
    }
  },

  logger() {
    const methods = []

    for (let key in this) {
      if (typeof this[key] === 'function') {
        methods.push(key)
      } else {
        console.log(key + ': ', this[key])
      }
    }

    console.log('methods :', methods)
    console.log(this.getRollbackMessage(this.screenPrice))
  },

  start() {
    this.asking()
    this.addPrices()
    this.getFullPrice()
    this.getServicePercentPrices()
    this.getTitle()
    this.logger()
  },
}

// appData.start()

// TMP for testing purposes
console.log('title: ', title)
console.log('btnHandlers: ', btnHandlers)
console.log('btnStart: ', btnStart)
console.log('btnReset: ', btnReset)
console.log('btnPlus: ', btnPlus)
console.log('mainControlsPercent: ', mainControlsPercent)
console.log('mainControlsNumber: ', mainControlsNumber)
console.log('inputRange: ', inputRange)
console.log('rangeValue: ', rangeValue)
console.log('inputTotal: ', inputTotal)
console.log('inputTotalCount: ', inputTotalCount)
console.log('inputTotalCountOther: ', inputTotalCountOther)
console.log('inputTotalFullCount: ', inputTotalFullCount)
console.log('inputTotalCountRollback: ', inputTotalCountRollback)
console.log('screens: ', screens)
