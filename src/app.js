const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');


const app = express();

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup for handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDir));

/*const weather = {
    forecast: '15 degrees',
    location: 'Copenhagen'
}*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "carsten rehder"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "carsten rehder",
        image: './images/cvprofil.png'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "carsten rehder",
        helpmessage: 'this is a helpful tect'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'you must provide a city name'
        });
    }
    geocode(req.query.city, (error, { lati, long, loca } = {} ) => {
        if (error) {
            //console.log(error);
            return res.send({ error });
        } else {
            weather(long, lati, (error, forecast) => {
                if (error) {
                    //console.log(error);
                    return res.send({ error });
                } else {
                    //console.log(loca, forecast);
                    return res.send({
                        forecast: forecast.forecast,
                        location: loca,
                        city: req.query.city
                    });
                }
            });
        }
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "carsten rehder",
        message: 'Help article not found'
    });
});

// 404 handler
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "carsten rehder",
        message: '404 page not found'
    });
});



app.listen(3000, () => {
    console.log('Server is running...');
});