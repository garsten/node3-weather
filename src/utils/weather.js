const request = require('request');

const weather = (long, lati, callback) => {
    const url = 'https://api.darksky.net/forecast/2cda40cdd0f62816ca5c16f1932f8ca6/'+long+','+lati+'?units=si';
    //console.log(url);
    request({url: url, json: true}, (error, { body } ) => {
        if (error) {
            callback('unable to connect', undefined);
        } else {
            if (body.code) {
                callback(body.error, undefined);
            } else {
                callback(false, {
                    temp: body.currently.apparentTemperature,
                    pers: body.currently.precipProbability,
                    high: body.daily.data[0].temperatureHigh,
                    forecast: body.daily.summary
                });
            }
        }
    });
}


module.exports = weather;