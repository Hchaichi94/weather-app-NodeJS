const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/720cde13eff3f801a46e62ebde6a158c/' + longitude + ',' + latitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services !', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently '
                + body.currently.temperature + ' degress out. This high today is '
                + body.daily.data[0].temperatureHigh + ' with a low of '
                + body.daily.data[0].temperatureLow + '. There is a '
                + body.currently.precipProbability + '% chance of rain.')
        }
    })
}






module.exports = forecast