// const http = require('http');
// const fs = require('fs');
const path = require('path');
// const url = require('url');
const express = require('express');


const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
console.log(`Server on port ${PORT}`);


// const server = http.createServer((req, res) => {

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html')
//     res.end('<h1>Hello World</h1>');
// })

// server.listen(port, () => {
//     console.log(`Server running at port ${port}`);
// })


// /**
//  * Reads the html file (index.html). If the file is successfully read, the server is created.
//  */
// fs.readFile('index.html', (err, html) => {
//     if (err) {
//         throw err;
//     }
//     console.log(__dirname);
//     createServer(html);
// });


// /**
//  * Creates the server
//  * @param {*} html 
//  */
// function createServer(html) {
//     const server = http.createServer((req, res) => {
//         res.statusCode = 200
//         res.setHeader('Content-Type', 'text/html');
//         res.write(html)
//         res.end();
//     });

//     server.listen(port, hostname, () => {
//         console.log(`Server running at http://${hostname}:${port}/`)
//     })
// }

