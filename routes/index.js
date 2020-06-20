//Setup for routing 

const express = require('express');
const router = express.Router();
const {
	getBusinessData
} = require('../controllers/businessData.js')
// const userData = data.users;
// const businessData = data.businesses;
const userData = require('../data/users.js');
const businessData = require('../data/businesses.js');



const constructorMethod = (app) => {
	app.get('/', async (req, res) => {
		res.sendFile('index.html');
	});

	app.use('*', (req, res) => {
		res.redirect('/');
	});
};


router
	.route('/')
	.post(getBusinessData)
	.get(constructorMethod);



module.exports = router;
//module.exports = constructorMethod;