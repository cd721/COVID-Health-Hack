const express = require('express');
const path = require('path');
const cors = require('cors');
var router = require('./routes/index.js');



const port = process.env.PORT || 3000;

//set up server
const app = express();
app.use(express.static(path.join(__dirname, 'public'))); //set static folder
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



app.use('/businesses/', router);
app.use('/', router);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});