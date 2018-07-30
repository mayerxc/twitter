//install and set up .env
require('dotenv').config()


//set up twitter
const twitter = require('twitter');
const config = require('./config.js');

let client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//Set up your search parameters
let params = {
    q: 'game of thrones',
    count: 1,
    result_type: 'recent',
    lang: 'en'
}

let tweeter;
// client.get('search/tweets', params, function(error, tweets, response) {
//     if(error) throw error;
//     console.log(tweets.statuses[0].text);  // The favorites.
//     // console.log(response);  // Raw response object.
//     tweeter = tweets
// });



//install and set up express
const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const axios = require('axios');
const CircularJSON = require('circular-json');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");

//use cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/client/index.html")));

app.get('/query/:query', (req, res) => {
    client.get('search/tweets', {
            q: req.params.query,
            count: 1,
            result_type: 'recent',
            lang: 'en'
        },
        function (error, tweets, response) {
            if (error) throw error;
            console.log(tweets.statuses[0].text); // The favorites.
            // console.log(response);  // Raw response object.
            tweeter = tweets
        }
    );
    res.json(tweeter);
});

app.get('/twitterhtml/:url', (req, res) => {
    console.log("url is:",req.params.url);
    // axios.get(req.params.url).then((response)=>{
    //     // console.log("html:", response.html);
    //     // let stringy = JSON.stringify(response); 
    //     let json = CircularJSON.stringify(response);
    //     console.log(json)
    //     res.json(json);
    // }).catch((error)=>console.log("error in app.js twitterhtml route", error));
    
    axios.get('https://publish.twitter.com/oembed?url=https://twitter.com/truthpiks/status/1021770039811350529')
        .then((response)=>{
        // console.log("html:", response.html);
        console.log("response from axios:", response);
        // let stringy = JSON.stringify(response); 
        // console.log(stringy)
        res.json(response.data);
    }).catch((error)=>console.log("error in app.js twitterhtml route", error));
    
    // fetch('https://publish.twitter.com/oembed?url=https://twitter.com/truthpiks/status/1021770039811350529')
    //     .then(response => response.json)
    //     .then(json => {
    //         console.log("did it get to json fetch??")
    //         console.log(json);
    //         res.json(json);
    //     })
    //     .catch((error)=>console.log("error in app.js twitterhtml route", error));

    // axios.get(req.params.url).then((response)=>{
    //     console.log("html:", response.html);
    //     res.json(response);
    // }).catch((error)=>console.log("error in app.js twitterhtml route", error));
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));