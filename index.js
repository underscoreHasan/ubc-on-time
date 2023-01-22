// const axios = require("axios")
require('dotenv').config()
// const { google } = require('googleapis')
const {Client, ReverseGeocodingLocationType, TravelMode} = require("@googlemaps/google-maps-services-js")

const client = new Client({})




function Journey (class1, buil1, class2, buil2, day, term){
    this.class1 = class1;
    this.buil1 = buil1;
    this.class2 = class2;
    this.buil2 = buil2;
    this.day = day;
    this.term = term;
    this.time = "";
    this.online = false;
}

let J1 = new Journey('CPSC 110 103', 'West Mall Swing Space', 'CHEM 111 112', 'Chemistry', 'Mon', 1);
let J3 = new Journey('CPSC 110 103', 'West Mall Swing Space', 'CHEM 111 112', 'Chemistry', 'Wed', 1);
let J4 = new Journey('DSCI 100 004', 'Hennings', 'CHEM 111 112', 'Chemistry', 'Thu', 1);
let J5 = new Journey('CHEM 111 112', 'Chemistry', 'CHEM 111 L07', 'Chemistry', 'Thu', 1);
let J6 = new Journey('CPSC 110 L19', 'Institute for Computing (ICICS/CS)', 'CHEM 111 112', 'Chemistry', 'Fri', 1);

let J7 = new Journey('CPSC 110 103', 'West Mall Swing Space', 'CHEM 111 112', 'Chemistry', 'Mon', 2);
let J9 = new Journey('CPSC 110 103', 'West Mall Swing Space', 'CHEM 111 112', 'Chemistry', 'Wed', 2);
let J10 = new Journey('DSCI 100 004', 'Hennings', 'CHEM 111 112', 'Chemistry', 'Thu', 2);
let J11 = new Journey('CHEM 111 112', 'Chemistry', 'CHEM 111 L07', 'Chemistry', 'Thu', 2);
let J12 = new Journey('CPSC 110 L19', 'Institute for Computing (ICICS/CS)', 'CHEM 111 112', 'Chemistry', 'Fri', 2);

var listofj = [J1,J3,J4,J5,J6,J7,J9,J10,J11,J12]

const API_KEY = process.env.API_KEY


const getDistance = async (journey) => {
    try {
        console.log(journey.buil1)
        console.log(journey.buil2)

        let response0 = await client.placeAutocomplete({
            params: {
                input: journey.buil1,
                location: {
                    lat: "49.2681556",
                    lng: "-123.2568092"
                },
                radius: 5000, //5km
                key: API_KEY,
            }
        })

        let response1 = await client.placeAutocomplete({
            params: {
                input: journey.buil2,
                location: {
                    lat: "49.2681556",
                    lng: "-123.2568092"
                },
                radius: 5000, //5km
                key: API_KEY,
            }
        })

        const place_id0 = response0.data.predictions[0].place_id
        const place_id1 = response1.data.predictions[0].place_id

        console.log(place_id0)
        console.log(place_id1)

        let response2 = await client.distancematrix({
            params: {
                key: API_KEY,
                origins: [`place_id:${place_id0}`],
                destinations: [`place_id:${place_id1}`],
                mode: TravelMode.walking,
            }
        })

        console.log(response2.data.rows[0].elements[0].duration.text);
        journey.time = response2.data.rows[0].elements[0].duration.text;
        console.log(journey.time);
        console.log(listofj);
    } catch (err) {
        console.log(err);
    }
}

for (let i = 0; i < listofj.length; i++) {
    console.log(i);
    getDistance(listofj[i]);
}
