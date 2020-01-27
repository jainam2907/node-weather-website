const request = require('request');

const forecast = (latitude,longitude, callback) =>{
    const url = "https://api.darksky.net/forecast/64493a503927a633626cdc6f72fc95ba/" + latitude + ","+ longitude;

    request({url, json:true}, (error,{body}={})=> {
        if(error){
            callback("Unable to connect to weather services..!",undefined);
        }
        else if(body.error){
            callback("Unable to find location..!");
        }
        else{
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. The high today is " + body.daily.data[0].temperatureHigh + " with a low of " + body.daily.data[0].temperatureLow + ". There is " + body.currently.precipProbability + "% chance of raining.")
        }
    });
};

module.exports = forecast;
