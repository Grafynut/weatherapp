const express = require('express');
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path');
const dotenv = require('dotenv');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config({ path: './config.env' });
const key = process.env.key;

app.get('/', (req, res) => {
    const city = req.query.city;
    var url;

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLocaleLowerCase()}&appid=${key}`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=${key}`;
    }

    request(
        url
        , (error, response, body) => {
            if (error) {
                console.error(error);
            } else {
                var Data = JSON.parse(body);
                if (response.statusCode === 200) {

                    res.render("index", {
                        statuscode: response.statusCode,
                        data: Data,
                        icon: Data.weather.map(item => item.icon),
                        localtime: new Date((Data.sys.sunrise + Data.timezone) * 1000).toString(),
                    });
                } else {
                    res.render('index', {
                        statuscode: response.statusCode,
                    })
                }
            }
        })
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log('app start at ' + PORT)
})