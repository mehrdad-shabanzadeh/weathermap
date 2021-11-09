const catchAsync = require('../utils/catchAsync');
const RedisClient = require('../db/drivers/redis')

const getWeatherBasedOnTime = catchAsync(async (response) => {
    const {start,end} = req.body;
    const value = await RedisClient.get('weather');
    const data = value.filter((item)=>{
        return ((start<item.createdAt) && (end>item.createdAt) )
    })

    console.log(data)
})

module.exports = getWeatherBasedOnTime
