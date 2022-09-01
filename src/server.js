const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const Message = require('./models/Message');
const messageController = require('./controllers/messageController');
const { INTEGER } = require('sequelize');
const io = new Server(http);

require('./database');
require('./authentication/auth')(passport);
require('dotenv');

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

io.on('connection', socket => {
  socket.on('enviar mensagem', dados => {
    const url = socket.handshake.headers.referer;
    const user_id = parseInt(url.split('/')[4]);
    const friend_id = parseInt(url.split('/')[5]);
    const { msg } = dados;

    messageController.store({ msg, user_id, friend_id });

    io.emit('receber mensagem', { msg, user_id, friend_id, id: socket.id });
  });
});

http.listen(3000);
