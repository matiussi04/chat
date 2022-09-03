const express = require('express');

const routes = express.Router();

const authenticationMiddleware = require('./authentication/authenticationMiddleware');

const home = require('./routes/home');
const chat = require('./routes/chat');
const createUser = require('./routes/create');
const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');
const authentication = require('./routes/authentication');

routes.get('/', login);

routes.post('/login', authentication);

routes.post('/logout', logout);

routes.get('/register', register);

routes.post('/create', createUser);

routes.get('/home', authenticationMiddleware, home);

routes.get('/home/:user_id/:friend_id/chat', authenticationMiddleware, chat);

module.exports = routes;
