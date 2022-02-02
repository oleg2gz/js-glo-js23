'use strict'

const rollback = 10
let title,
  screens,
  screenPrice,
  adaptive,
  allServicePrices,
  service1,
  service2,
  fullPrice,
  servicePercentPrice

const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = () => {
  title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки')
  screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные'
  )

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?')
  } while (!isNumber(screenPrice))

  screenPrice = parseFloat(screenPrice)
  adaptive = confirm('Нужен ли адаптив на сайте?')
}

const getAllServicePrices = () => {
  let sum = 0
  let i = 2

  while (i) {
    let tmpPrice

    if (i === 2) {
      service1 = prompt('Какой дополнительный тип услуги нужен?')
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?')
    }

    do {
      tmpPrice = prompt('Сколько это будет стоить?')
    } while (!isNumber(tmpPrice))

    sum += parseFloat(tmpPrice)
    i--
  }
  return sum
}

function getFullPrice(value1, value2) {
  return value1 + value2
}

const getTitle = (str) => {
  str = str || 'Калькулятор вёрстки'
  str = str.trim()

  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

const getServicePercentPrices = (price, rollback) => {
  return Math.ceil(price - price * (rollback / 100))
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

asking()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice(screenPrice, allServicePrices)
servicePercentPrice = getServicePercentPrices(fullPrice, rollback)
title = getTitle(title)

showTypeOf(title, fullPrice, adaptive)
// TMP Временно, удаление лишних запятых в конце строки screens
screens = getScreens(screens)

console.log(getRollbackMessage(fullPrice))

console.log('screens: ', screens?.toLowerCase().split(', '))

console.log('allServicePrices: ', allServicePrices)

console.log('servicePercentPrice: ', servicePercentPrice)
