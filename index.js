
const fs = require('fs');
const path = require('path');

const fetch = require('node-fetch');
const express = require('express');
const https = require('follow-redirects').https;

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

//set up server
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
console.log(`Server on port ${PORT}`);


//make get request
var options = {
    'method': 'GET',
    'hostname': 'api.yelp.com',
    'path': '/v3/businesses/search?latitude=37.7670169511878&longitude=-122.42184275',
    'headers': {
        'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
        'Cookie': '__cfduid=daff0cc2c95eb471d39b0014ed24cd6251589858589'
    },
    'maxRedirects': 20
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

req.end();
