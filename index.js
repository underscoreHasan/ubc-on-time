// const axios = require("axios")
require('dotenv').config()
// const { google } = require('googleapis')
const {Client, ReverseGeocodingLocationType, TravelMode} = require("@googlemaps/google-maps-services-js")

const client = new Client({})




/*
//Buchanan+Bldg,+Vancouver,+BC+V6T+1Z1
      //@49.2681556,-123.2568092,17z
      //ICICS+Building,+Main+Mall,+Vancouver,+BC
      //@49.2612707,-123.2511253,17z
*/
const API_KEY = process.env.API_KEY

const getDistance = async () => {

    let response = await client.placeAutocomplete({
        params: {
            input: "Buchanan",
            location: {
                lat: "49.2681556",
                lng: "-123.2568092"
            },
            radius: 5000, //5km
            key: API_KEY,
        }
    })

    const place_id = response.data.predictions[0].place_id

    // ChIJy0m_M7FyhlQRSzi-VB2LgzQ Buchanan
    // ChIJx0vWJMpyhlQRYD0_Out-qAo icics
    //ChIJi7hXLcpyhlQRTc5UsPU_qPM macleod
    console.log(place_id)

    response = await client.distancematrix({
        params: {
            key: API_KEY,
            origins: [`place_id:${place_id}`],
            destinations: [`place_id:ChIJx0vWJMpyhlQRYD0_Out-qAo`, `place_id:ChIJi7hXLcpyhlQRTc5UsPU_qPM`],
            mode: TravelMode.walking,
        }
    })

    console.log(response.data.rows[0].elements)
}


getDistance()
// .then((res) => conso
// console.log(process.env.API_KEY)

//receive list send list
// get back list of place ids
// save place ids

//have file with data and data is map from place name to place_id
//this would lower # of api calls

// const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;

console.log("Hello World")

