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


//install and set up express
const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const axios = require('axios');

//use cors
app.use(cors());

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/client/index.html")));

app.get('/query', function(req, res) {
    let tweeter;
    const count = req.query.count || 10
    let params = {
        q: req.query.search,
        "count": count,
        result_type: 'recent',
        lang: 'en'
    }
    //include location if it's in the url
    if (req.query.geocode) {
        params['geocode'] = req.query.geocode;
    }
    client.get('search/tweets', params, function (error, tweets, response) {
            if (error) throw error;
            console.log(tweets.statuses[0].text); // The favorites.
            // console.log(response);  // Raw response object.
            tweeter = tweets
            res.json(tweeter);
        }
    );
    
});

app.get('/user', function(req, res) {
    const count = req.query.count || 5
    let params = {
        q: req.query.user,
        "count": count,
    }
    //include location if it's in the url
    if (req.query.geocode) {
        params['geocode'] = req.query.geocode;
    }
    client.get('users/search', params, function (error, users, response) {
            if (error) throw error;
            console.log(users); // the user json data.
            // console.log(response);  // Raw response object.
            res.json(users);
        }
    );
    
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));