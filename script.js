'use strict'

const appData = {
  rollback: 10,
  title: null,
  screens: null,
  screenPrice: null,
  adaptive: null,
  allServicePrices: null,
  service1: null,
  service2: null,
  fullPrice: null,
  servicePercentPrice: null,

  getNumberFromUser(message, defaultMessage) {
    let number = null

    const isNumber = (num) => {
      return !isNaN(parseFloat(num)) && isFinite(num)
    }

    do {
      number = prompt(message, defaultMessage)
    } while (!isNumber(number))

    return parseFloat(number)
  },

  asking() {
    this.title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки')
    this.screens = prompt(
      'Какие типы экранов нужно разработать?',
      'Простые, Сложные, Интерактивные'
    )

    this.screenPrice = this.getNumberFromUser(
      'Сколько будет стоить данная работа?',
      ''
    )
    this.adaptive = confirm('Нужен ли адаптив на сайте?')
  },

  getAllServicePrices() {
    let sum = 0
    let i = 2

    while (i) {
      let tmpPrice

      if (i === 2) {
        this.service1 = prompt('Какой дополнительный тип услуги нужен?')
      } else if (i === 1) {
        this.service2 = prompt('Какой дополнительный тип услуги нужен?')
      }

      tmpPrice = this.getNumberFromUser('Сколько это будет стоить?', '')
      sum += tmpPrice
      i--
    }
    return sum
  },

  getFullPrice(value1, value2) {
    return value1 + value2
  },

  getTitle(str) {
    str = str || 'Калькулятор вёрстки'
    str = str.trim()

    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  },

  getServicePercentPrices(price, rollback) {
    return Math.ceil(price - price * (rollback / 100))
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

  showTypeOf(...types) {
    types.forEach((item) => console.log(item, typeof item))
  },

  // TMP Временно, удаление лишних запятых в конце строки
  getScreens(str) {
    str = str || ''
    str = str.trim()

    if (str[str.length - 1] === ',') {
      str = str.slice(0, -1)
    }
    return str
  },

  logger() {
    console.log('fullPrice: ', this.getRollbackMessage(this.fullPrice))
    console.log('screens: ', this.screens?.toLowerCase().split(', '))
    console.log('allServicePrices: ', this.allServicePrices)
    console.log('servicePercentPrice: ', this.servicePercentPrice)

    for (let key in this) {
      // console.log(this[key])
      console.log(key)
    }
  },

  start() {
    this.asking()
    this.allServicePrices = this.getAllServicePrices()
    this.fullPrice = this.getFullPrice(this.screenPrice, this.allServicePrices)
    this.servicePercentPrice = this.getServicePercentPrices(
      this.fullPrice,
      this.rollback
    )
    this.title = this.getTitle(this.title)

    this.showTypeOf(this.title, this.fullPrice, this.adaptive)
    // TMP Временно, удаление лишних запятых в конце строки screens
    this.screens = this.getScreens(this.screens)
    this.logger()
  },
}

appData.start()
