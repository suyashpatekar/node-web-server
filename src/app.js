const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        name:'Suyash',
        title:'Weather'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title:'About',
        name:'Suyash'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help Page',
        name:'Suyash'
    })
})

app.get('/weather', (req, res) => {
    var address = req.query.address
    if(!address){
        return res.send({
            error:"You must provode an address"
        })
    }
    geocode(address , (error, {latitude , longitude , location} = {}) =>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                // location:'Pune, Maharashtra',
                address: location
            })
        })
    })
    
    
})



app.get('/products', (req,res)=> {
    if(!req.query.search){
        return res.send({
            error:"You must provide a product name"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/test', (req,res) => {
    res.render('404',{
        title:'404',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Suyash',
        errorMessage:'Page Not Found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})