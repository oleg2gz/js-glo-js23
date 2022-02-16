'use strict'

const title = document.getElementsByTagName('h1')[0]
const btnPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

const cmsCheckbox = document.getElementById('cms-open')
const cmsBlock = document.querySelector('.hidden-cms-variants')
const cmsSelect = document.getElementById('cms-select')
const cmsOther = document.querySelector(
  '.hidden-cms-variants > .main-controls__input'
)
const cmsOtherInput = document.getElementById('cms-other-input')

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
  servicesPercent: {},
  servicesNumber: {},
  servicesCMS: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePricesCMS: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  init() {
    this.addTitle()
    btnStart.addEventListener('click', this.start.bind(this))
    btnReset.addEventListener('click', this.reset.bind(this))
    btnPlus.addEventListener('click', this.addScreenBlock)
    inputRange.addEventListener('input', this.showRollback.bind(this))
    cmsCheckbox.addEventListener('change', () => {
      cmsBlock.style.display = cmsCheckbox.checked ? 'flex' : 'none'
    })
    cmsSelect.addEventListener('change', (e) => {
      if (cmsSelect.value === 'other') {
        cmsOther.style.display = 'block'
      } else {
        cmsOther.style.display = 'none'
        cmsOtherInput.value = ''
      }
    })
  },

  addTitle() {
    document.title = title.textContent
  },

  start() {
    this.addScreens()

    if (
      this.screens.find(({ price, count }) => !price || !this.isNumber(count))
    )
      return

    this.addServices()
    this.addPrices()
    this.showResult()
    this.logger()

    screens.forEach((screen) => {
      const select = screen.querySelector('select')
      const input = screen.querySelector('input[type=text]')

      select.disabled = true
      input.disabled = true
    })
    cmsSelect.disabled = true
    cmsOtherInput.disabled = true
    btnPlus.disabled = true
    btnStart.style.display = 'none'
    btnReset.style.display = ''
  },

  reset() {
    this.title = ''
    this.screens = []
    this.screensCount = 0
    this.screenPrice = 0
    this.adaptive = true
    this.rollback = 0
    this.servicesPercent = {}
    this.servicesNumber = {}
    this.serviceCMS = {}
    this.servicePricesPercent = 0
    this.servicePricesNumber = 0
    this.servicePricesCMS = 0
    this.fullPrice = 0
    this.servicePercentPrice = 0

    screens.forEach((screen, i) => {
      if (i === 0) {
        const select = document.querySelector('select')
        const input = document.querySelector('input[type=text]')

        select.disabled = false
        select.selectedIndex = 0
        input.disabled = false
        input.value = ''
      } else {
        screen.remove()
      }
    })
    screens = document.querySelectorAll('.screen')

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      if (check.checked) check.checked = false
    })
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      if (check.checked) check.checked = false
    })

    btnPlus.disabled = false
    btnReset.style.display = 'none'
    btnStart.style.display = ''
    cmsCheckbox.checked = false
    cmsBlock.style.display = 'none'
    cmsSelect.disabled = false
    cmsSelect.selectedIndex = 0
    cmsOther.style.display = 'none'
    cmsOtherInput.disabled = false
    cmsOtherInput.value = ''
    inputRange.value = 0
    rangeValue.textContent = '0%'
    total.value = 0
    totalCount.value = 0
    totalCountOther.value = 0
    totalFullCount.value = 0
    totalCountRollback.value = 0

    this.logger()
  },

  showResult() {
    total.value = this.screenPrice
    totalCount.value = this.screensCount
    totalCountOther.value =
      this.servicePricesPercent +
      this.servicePricesNumber +
      this.servicePricesCMS
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
    this.screens.length = 0
    screens = document.querySelectorAll('.screen')

    screens.forEach((screen, i) => {
      const select = screen.querySelector('select')
      const input = screen.querySelector('input')
      const selectName = select.options[select.selectedIndex].textContent

      this.screens.push({
        id: i,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      })
    })
    this.screensCount = this.screens.reduce((acc, { count }) => acc + count, 0)
  },

  addServices() {
    this.servicesPercent = {}
    this.servicesNumber = {}
    this.servicesCMS = {}

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value
      }
    })
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value
      }
    })

    this.servicesCMS.name =
      cmsSelect.options[cmsSelect.selectedIndex].textContent

    if (this.isNumber(cmsSelect.value)) {
      this.servicesCMS.percent = parseFloat(cmsSelect.value)
    } else if (this.isNumber(cmsOtherInput.value)) {
      this.servicesCMS.percent = parseFloat(cmsOtherInput.value)
    } else {
      this.servicesCMS.percent = 0
    }
  },

  addScreenBlock() {
    screens = document.querySelectorAll('.screen')
    const cloneScreen = screens[0].cloneNode(true)
    cloneScreen.querySelector('input[type=text]').value = ''
    screens[screens.length - 1].after(cloneScreen)
  },

  addPrices() {
    this.screenPrice = this.screens.reduce((acc, { price }) => acc + price, 0)

    this.servicePricesNumber = Object.values(this.servicesNumber).reduce(
      (acc, price) => acc + price,
      0
    )
    this.servicePricesPercent = Object.values(this.servicesPercent).reduce(
      (acc, percent) => acc + this.screenPrice * (percent / 100),
      0
    )

    this.fullPrice =
      this.screenPrice + this.servicePricesNumber + this.servicePricesPercent

    if (this.servicesCMS.percent) {
      this.servicePricesCMS = this.fullPrice * (this.servicesCMS.percent / 100)
      this.fullPrice += this.servicePricesCMS
    }

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
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
    console.log('cmsSelect: ', cmsSelect.value)
    console.log('cmsOtherInput: ', cmsOtherInput.value)
    // Посмотреть какие методы доступны
    // console.log('methods :', methods)
  },
}

appData.init()
