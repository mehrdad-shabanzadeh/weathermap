const Weather = require('../../../db/models/weather');
const axios = require('axios');
const catchAsync = require('../../../utils/catchAsync');
const cron = require('node-cron');
const redisDemoSet = require('../../../config/redisSet');
const redisDemoGet = require('../../../config/redisGet');

const DatabaseServices = require('../../../db/services')
const Errors = require('../../errors')

const API_key ="b45da14dc267921b9f079b759ee57d02";
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'

const getNowWeathermap = (data) => {
    const {city} = data
    _getNewWeather(baseUrl, city)
        .then((result) => {
            return DatabaseServices.Weather.addNewWeather(result)
        })
        .then((result) => {
            return resolve(result)
        })
        .catch((err) => {
            return reject(err)
        })
}

const getTenLatestWeathermap = catchAsync (async (req,res,next) => {           
    cron.schedule('*/20 * * * * *',catchAsync (async () => {
        console.log('running a task every one minutes');
        const {city} = req.body;
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`).then (catchAsync(async function(response) {
            const {weather,wind,clouds} = response.data;

            console.log(weather);
            console.log(wind);
            console.log(clouds);

            // connect to redis
            redisDemoSet(response);      
        }));
    }));
    res.status(200).json({
        success : true,
        msg : 'getTenLatestWeathermap',
    })
});

const getWeathermapByTime = catchAsync (async (req,res,next) => {
    // connect to redis
    redisDemoSet(req.body);

    res.status(200).json({
        success : true,
        msg : 'getWeathermapByTime',
    }) 
});

const _getNewWeather = (baseUrl, city) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}?q=${city}&appid=${API_key}`)
            .then((res) => {
                return resolve(res.data)
            })
            .catch((err) => {
                return reject(Errors.General)
            })
    })
}

module.exports = {
    getWeathermapByTime,
    getTenLatestWeathermap,
    getNowWeathermap,
}
