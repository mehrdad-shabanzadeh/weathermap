const Weather = require('../../models/weather')
const Promise = require('bluebird')

const addNewWeather = (data) => {
  return new Promise((resolve, reject) => {
    const newWeather = {
      weather,
      wind,
      clouds
    }
    Weather.create(newWeather, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

const getOneWeatherBasedOnDate = (date) => {
  return new Promise((resolve, reject) => {
    const condition = {
      createdAt: date
    }
    Weather.findOne(condition)
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

module.exports = {
  addNewWeather,
  getOneWeatherBasedOnDate,
}