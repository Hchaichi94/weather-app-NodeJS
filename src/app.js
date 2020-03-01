const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')


//Setup static directory to serve
app.use(express.static(publicDirectory))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)




app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'hchaichi akrem'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'hchaichi akrem'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help me',
        name: 'hchaichi akrem'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'hchaichi akrem',
        errorMessage: 'help not found'
    })
}
)

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'hchaichi akrem',
        errorMessage: 'page not found'
    })
}
)


app.listen(3000, () => {

    console.log('server is up on port 3000')
})