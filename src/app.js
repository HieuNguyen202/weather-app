const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const public_dir = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory for serve
app.use(express.static(public_dir))

app.get('', (req, res) => {
    res.render('views/index', {
        title: 'Weather App',
        name: 'Hugh Nguyen',
    })
})

app.get('/about', (req, res) => {
    res.render('views/about', {
        title: 'About Me',
        name: 'Hugh Nguyen',
    })
})

app.get('/help', (req, res) => {
    res.render('views/help', {
        title: 'Help page',
        name: 'Hugh Nguyen',
    })
})

app.get('', (req, res) => {
    res.render('views/index', {
        title: 'Weather App',
        name: 'Hugh Nguyen',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {longtitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(longtitude, latitude, (error, forecast_data) => {
            if(error) {
                return res.send({error})
            }
            return res.send({forecast: forecast_data,
                             address: req.query.address,
                             location })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('views/404', {
        title: '404 error',
        name: 'Hugh Nguyen',
        err_msg: 'Help article now found.'
    })
})

app.get('*', (req, res) => {
    res.render('views/404', {
        title: '404 error',
        name: 'Hugh Nguyen',
        err_msg: 'Page now found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})