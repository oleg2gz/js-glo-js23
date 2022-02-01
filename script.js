'use strict'

let title = prompt('Как называется ваш проект?', 'Проект')
let screens = prompt(
  'Какие типы экранов нужно разработать?',
  'Простые, Сложные, Интерактивные'
)
const screenPrice = +prompt('Сколько будет стоить данная работа?')
const adaptive = confirm('Нужен ли адаптив на сайте?')
const service1 = prompt('Какой дополнительный тип услуги нужен?')
const servicePrice1 = +prompt('Сколько это будет стоить?')
const service2 = prompt('Какой дополнительный тип услуги нужен?')
const servicePrice2 = +prompt('Сколько это будет стоить?')
const rollback = 15

let allServicePrices, fullPrice, servicePercentPrice

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2
}

function getFullPrice() {
  return screenPrice + allServicePrices
}

const getTitle = (str) => {
  str = str || 'проект'
  str = str.trim()

  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

const getServicePercentPrices = () => {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100))
}

const getRollbackMessage = (price) => {
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
}

const showTypeOf = (...types) => {
  types.forEach((item) => console.log(item, typeof item))
}

// TMP Временно, удаление лишних запятых в конце строки
const getScreens = (str) => {
  str = str || ''
  str = str.trim()

  if (str[str.length - 1] === ',') {
    str = str.slice(0, -1)
  }
  return str
}

screens = getScreens(screens)

title = getTitle(title)
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice()
servicePercentPrice = getServicePercentPrices()

showTypeOf(title, fullPrice, adaptive)

console.log(getRollbackMessage(fullPrice))

console.log('screens as a string: ', screens?.toLowerCase() || 'no data')
console.log('screens as an array: ', screens?.toLowerCase().split(', '))

console.log(getServicePercentPrices())
