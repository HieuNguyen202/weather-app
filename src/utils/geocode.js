const request = require('request')

const geocode = (address, callback) => {
    const geocode_base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    const access_token = 'pk.eyJ1IjoiaHVnaG5ndXllbiIsImEiOiJja2kweW92OG0wYXAzMndxbnNtMzlpd3BzIn0.cVcQkp21t9f1PlV2jlq5AQ'
    const url = `${geocode_base_url}/${encodeURIComponent(address)}.json?access_token=${access_token}&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try a different one.', undefined)
        } else {
            const place = body.features[0]
            callback(undefined, {
                longtitude: place.center[0],
                latitude: place.center[1],
                location: place.place_name,
            })
        }
    })
}

module.exports = geocode