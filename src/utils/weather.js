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
                callback(false, 
                    body.daily.summary 
                    + 'It is currently ' 
                    + body.currently.apparentTemperature 
                    + ' degrees celcius with a ' 
                    + body.currently.precipProbability 
                    + '% chance for rain. Todays high is ' 
                    + body.daily.data[0].temperatureHigh
                    + ' degrees and todays low is '
                    + body.daily.data[0].temperatureLow
                    );
            }
        }
    });
}


module.exports = weather;