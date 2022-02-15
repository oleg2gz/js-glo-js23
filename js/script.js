'use strict'

const title = document.getElementsByTagName('h1')[0]
const btnPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const inputRange = document.querySelector('input[type=range]')
const rangeValue = document.querySelector('span.range-value')

const btnHandlers = document.getElementsByClassName('handler_btn')
const btnStart = btnHandlers[0]
const btnReset = btnHandlers[1]

const totalAll = document.getElementsByClassName('total-input')
const total = totalAll[0]
const totalCount = totalAll[1]
const totalCountOther = totalAll[2]
const totalFullCount = totalAll[3]
const totalCountRollback = totalAll[4]

let screens = document.querySelectorAll('.screen')

const appData = {
  title: '',
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init() {
    this.addTitle()
    btnStart.addEventListener('click', this.start)
    btnPlus.addEventListener('click', this.addScreenBlock)
    inputRange.addEventListener('input', this.showRollback.bind(this))
  },

  addTitle() {
    document.title = title.textContent
  },

  start() {
    appData.addScreens()

    if (
      appData.screens.find(
        ({ price, count }) => !price || !appData.isNumber(count)
      )
    )
      return

    appData.addServices()
    appData.addPrices()
    appData.showResult()
    appData.logger()
  },

  showResult() {
    total.value = this.screenPrice
    totalCount.value = this.screensCount
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
    totalFullCount.value = this.fullPrice
    totalCountRollback.value = this.servicePercentPrice
  },

  showRollback() {
    this.rollback = +inputRange.value
    rangeValue.textContent = this.rollback + '%'

    this.addPrices()
    totalCountRollback.value = this.servicePercentPrice
  },

  addScreens() {
    appData.screens.length = 0
    screens = document.querySelectorAll('.screen')

    screens.forEach((screen, i) => {
      const select = screen.querySelector('select')
      const input = screen.querySelector('input')
      const selectName = select.options[select.selectedIndex].textContent

      appData.screens.push({
        id: i,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      })
    })
  },

  addServices() {
    appData.servicesPercent = {}
    appData.servicesNumber = {}

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value
      }
    })
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value
      }
    })
  },

  addScreenBlock() {
    screens = document.querySelectorAll('.screen')
    const cloneScreen = screens[0].cloneNode(true)
    cloneScreen.querySelector('input[type=text]').value = ''
    screens[screens.length - 1].after(cloneScreen)
  },

  addPrices() {
    appData.screenPrice = appData.screens.reduce(
      (acc, { price }) => acc + price,
      0
    )
    appData.screensCount = appData.screens.reduce(
      (acc, { count }) => acc + count,
      0
    )

    appData.servicePricesNumber = Object.values(appData.servicesNumber).reduce(
      (acc, price) => acc + price,
      0
    )
    appData.servicePricesPercent = Object.values(
      appData.servicesPercent
    ).reduce((acc, percent) => acc + appData.screenPrice * (percent / 100), 0)

    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    )
  },

  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
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
    // Посмотреть какие методы доступны
    // console.log('methods :', methods)
  },
}

appData.init()
