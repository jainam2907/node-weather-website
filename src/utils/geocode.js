const request = require('request');

const geocode = (address,callback)=> {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +".json?limit=1&access_token=pk.eyJ1IjoiamFpbmFtMjkwNyIsImEiOiJjanh6Mml0dzkwMDVlM2dudWN6cGM2MXVtIn0.qN-CKoAgVQ46wMAl496RBg";

    request({ url, json:true}, (error,{body}={})=>{
        if(error){
            callback("Unable to connect to location services..!",undefined);
        } 
        else if(body.features.length === 0){
            callback("Unable to find location..!",undefined);
        } 
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;