'use strict'

const title = 'Проект'
const screens = 'Простые, Сложные, Интерактивные'
const screenPrice = 425
const rollback = 15
const fullPrice = 5000
const adaptive = true

// Вывести в консоль тип данных значений переменных title, fullPrice, adaptive
console.log(typeof title)
console.log(typeof fullPrice)
console.log(typeof adaptive)

// Вывести в консоль длину строки screens
console.log(screens.length)

// Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани” и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
console.log(
  `Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юаней`
)
console.log(
  `Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юаней`
)

// Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
console.log(screens.toLowerCase().split(' '))

// Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100))
console.log(fullPrice * (rollback / 100))
