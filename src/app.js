const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define path for express config
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static public directory path
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Joseph chijioke'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ',
        name:'Joseph chijioke'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message:'thanks for visiting our site',
        name:'chijioke joseph', 
    })
})

app.get('/weather', (req, res) => {
if(!req.query.address){
    return res.send({
        error: 'you are suppose to provide an address'
    })
} else {
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error){
          return  res.send({error})
        }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({error})
        }
        res.send({
            address : req.query.address,
           location,
           forecastData,
           
        })
    })
    })
}

})

// app.get('/products', (req, res) =>{ 
//     if (!req.query.search) {
//        return  res.send({
//             error: 'you must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 page',
        message: 'help article not found',
        name: 'none'

    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        message: 'page not found',
        name: 'none'

    })
})

app.listen('3000', () => {
console.log('Server is up on port 3000')
})