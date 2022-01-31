'use strict'

const title = prompt('Как называется ваш проект?', 'Проект')
const screens = prompt(
  'Какие типы экранов нужно разработать?',
  'Простые, Сложные, Интерактивные'
)
const screenPrice = +prompt('Сколько будет стоить данная работа?')
const adaptive = confirm('Нужен ли адаптив на сайте?')
const service1 = prompt('Какой дополнительный тип услуги нужен?')
const servicePrice1 = +prompt('Сколько это будет стоить?')
const service2 = prompt('Какой дополнительный тип услуги нужен?')
const servicePrice2 = +prompt('Сколько это будет стоить?')
const fullPrice = screenPrice + servicePrice1 + servicePrice2
const rollback = 15
const servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100))

console.log(servicePercentPrice)

switch (true) {
  case fullPrice >= 30000:
    console.log('Даем скидку в 10%')
    break
  case 15000 <= fullPrice && fullPrice < 30000:
    console.log('Даем скидку в 5%')
    break
  case 0 <= fullPrice && fullPrice < 15000:
    console.log('Скидка не предусмотрена')
    break
  default:
    console.warn('Что то пошло не так')
}

// Previous functionality

console.log(typeof title)
console.log(typeof fullPrice)
console.log(typeof adaptive)

console.log(screens?.length || 'no data')

console.log(
  `Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юаней`
)
console.log(
  `Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юаней`
)

console.log(screens?.toLowerCase().split(', ') || 'no data')

console.log(fullPrice * (rollback / 100))
