const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configuration
const publicDirecPath = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup view engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirecPath));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'JC'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'JC'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        helpText:'Help Message will go here ...',
        name: 'JC'
    });
});

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please enter an address"
        });
    }
    
    geocode(req.query.address ,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});     
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});  
            }
    
            res.send({
                location: location,
                forecast: forecastData
            });
        });
    });

    
});

app.get('/help/*', (req,res)=>{
    res.render('page404',{
        title: '404',
        name: 'JC',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req,res)=>{
    res.render('page404',{
        title: '404',
        name: 'JC',
        errorMsg: 'Page not found'
    });
});

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});