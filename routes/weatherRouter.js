const express = require ('express');
const router = express.Router();

const SuccessHandler = require('../utils/successHandler')
const ErrorHandler = require('../utils/errorHandler')

const Services = require('../services')

router.route('/now')
    .get((req, res, next) => {
        Services.Weather.getNowWeathermap(req.body)
            .then((result) => {
                return SuccessHandler(res, status, result, info)
            })
            .catch((err) => {
                return ErrorHandler(res, status, err, info)
            })
    })

router.get('/tenlatest', require('../services/weather'))

router.get('/time', require('../services/weather'))


module.exports = router
