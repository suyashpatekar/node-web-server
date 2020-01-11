const request = require('request')

const forecast = (latitude,longitude,callback) => {
    let url = "https://api.darksky.net/forecast/fdae769a42237fa2061d42ac84b5b109/"+latitude+","+longitude+"?units=si"
    request({url , json:true},(error, { body }) => {
        if(error){
            callback("Unable to connect !",undefined)
        }else if(body.error){
            callback("Try different Location ",undefined)
        }else{
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out, and there are ${body.currently.precipProbability} % chances of rain today.`)
        }
    })
}

module.exports = forecast