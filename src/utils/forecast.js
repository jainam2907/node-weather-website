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
            callback(undefined, body.daily.data[0].summary + " There is currently " + body.currently.temperature + " degrees out and " + body.currently.precipProbability + "% chance of raining.")
        }
    });
};

module.exports = forecast;
