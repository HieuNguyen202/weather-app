const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d5bd9a39b84301efbcde023cd993cdab&query=${latitude},${longtitude}&units=f`
    request({ url, json: true }, (error, { body }) => {
        const {error:request_error, current} = body
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (request_error) {
            callback('Unable to find location', undefined)
        }
        else {
            const status = `${current.weather_descriptions[0]}. It is currently ${current.temperature} F degrees outside, and it feels like ${current.feelslike} F degrees. The humidity is ${current.humidity}%.`
            callback(undefined, status)
        }
    })
}

module.exports = forecast