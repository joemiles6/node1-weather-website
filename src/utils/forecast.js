const request  = require('request')

const forecast = (lantitude, longitude, callback) => {
const url = `https://api.darksky.net/forecast/ef4e38f50ee3514a78a9feddf520e008/${lantitude}, ${longitude}`;

request({url, json: true}, (error, {body}) => {
    if(error){
        callback('Unable to connect due to low level error, try checking network', undefined);
    } else if(body.error) {
        callback('Unable to get coordinate', undefined)
    } else {
        callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${body.currently.precipProbability}% chance of rain`)
    }
})
}


module.exports = forecast