const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZ2Fyc3RlbiIsImEiOiJjanNydW40aTQxOWk2NDRvMGY4bWZkcngzIn0._h84U96dYGGxp8i3uZXXZQ';
    request({url, json: true}, (error, { body } ) => {
        if (error) {
            callback('unable to connect', undefined);
        } else {
            if (body.features.length === 0) {
                callback('unable to find location', undefined);
            } else {
                callback(false, {
                    lati: body.features[0].center[0],
                    long: body.features[0].center[1],
                    loca: body.features[0].place_name
                });
            }
        }
    });
}

module.exports = geocode;