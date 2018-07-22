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
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

let tweeter;
client.get('search/tweets', params, function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets.statuses[0].text);  // The favorites.
    // console.log(response);  // Raw response object.
    tweeter = tweets
});



//install and set up express
const express = require('express')
const app = express()

app.get('/', (req, res) => res.json(tweeter));

app.listen(3000, () => console.log('Example app listening on port 3000!'));


