var express = require('express');
var users_Route = express.Router();

//-----------importing controllers----------------
const users_Controller = require('../controllers/usersController');

users_Route.route('/')
 .post(users_Controller.createUser)
 .get(users_Controller.getAllUsers)


 users_Route.route('/meeting')
 .post(users_Controller.createMeeting)
 

 users_Route.route('/meeting/:user_id')
 .get(users_Controller.getUsersCallender)


 module.exports = users_Route;