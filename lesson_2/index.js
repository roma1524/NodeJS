// input date format hh-DD-MM-YYYY
require('moment-precise-range-plugin');
const moment = require('moment');
const EventEmitter = require('events');
const [dateStringInFuture] = process.argv.slice(2);
const DATE_FORMAT_PATTERN = 'YYYY-MM-DD HH:mm:ss';

/**
 * Преобразуем полученную строку в экземпляр класса Date
 * @param dateString
 * @returns {Date}
 */

const getDateFromDAteString = (dateString) => {
  // TODO: В идеале здесь нужна валидация, чтобы недопустить "мусорных" данных.
  const [hour, day, month, year] = dateString.split('-');

  return new Date(Date.UTC(year, month - 1, day, hour));
}

/**
 * Функция вывщдит / завершает таймер
 * @param {Date} dateInFuture
 */
const showRemainingTime = (dateInFuture) => {
  const dateNow = new Date();

  if (dateNow >= dateInFuture) { // неявно приводит к числу (миллисекунды) и сравниваем
    emitter.emit('timerEnd');
  } else {
    const currentDateFormatted = moment(dateNow, DATE_FORMAT_PATTERN);
    const futureDateFormatted = moment(dateInFuture, DATE_FORMAT_PATTERN);
    const diff = moment.preciseDiff(currentDateFormatted, futureDateFormatted);

    console.clear();
    console.log(diff);
  }
}

/**
 * Функция завершает таймер
 * @param {Number} timerId
 */
const showTimerDone = (timerId) => {
  clearInterval(timerId);
  console.log('time is up');
};

const emitter = new EventEmitter();
const dateInFuture = getDateFromDAteString(dateStringInFuture);
const timerId = setInterval(() => {
  emitter.emit('timeTrick', dateInFuture);
}, 1000)

emitter.on('timeTrick', showRemainingTime);
emitter.on('timeTrick', () => {
  showTimerDone(timerId);
})