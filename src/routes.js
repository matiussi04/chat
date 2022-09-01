const express = require('express');

const userController = require('./controllers/userController');

const routes = express.Router();
const passport = require('passport');

const authenticationMiddleware = require('./authentication/authenticationMiddleware');
const User = require('./models/User');
const { Op } = require('sequelize');
const Message = require('./models/Message');

routes.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }

  if (req.query.fail) {
    return res.render('login', { message: 'Usuário ou senha inválidos' });
  } else {
    return res.render('login', { message: null });
  }
});

routes.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

routes.get('/register', (req, res) => {
  const {
    emailExist,
    usernameExist,
    usernameLength,
    passwordLength,
    ConfirmPasswordIsDiferent
  } = req.query;
  let message;

  if (emailExist) {
    message = 'Esse email já foi cadastrado';
  } else if (usernameExist) {
    message = 'Esse usuario já existe';
  } else if (usernameLength) {
    message = 'Apelido deve conter entre 6 e 14 caracteres';
  } else if (passwordLength) {
    message = 'Apelido deve conter 8 ou mais caracteres';
  } else if (ConfirmPasswordIsDiferent) {
    message = 'Senha e a Confrimar senha estão diferentes';
  } else {
    message = null;
  }

  res.render('register', { message });
});

routes.post('/create', userController.store);

routes.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/?fail=true'
  })
);

routes.get('/home', authenticationMiddleware, async (req, res) => {
  const { user } = req;
  const friends = await User.findAll({
    where: {
      id: {
        [Op.not]: [user.id]
      }
    }
  });
  res.render('index', { friends, user });
});

routes.get(
  '/home/:user_id/:friend_id/chat',
  authenticationMiddleware,
  async (req, res) => {
    const { user_id, friend_id } = req.params;

    const user = await User.findByPk(user_id);
    const friend = await User.findByPk(friend_id);

    const messages = await Message.findAll({
      where: {
        [Op.and]: [
          { [Op.or]: [{ user_id: user.id }, { user_id: friend.id }] },
          { [Op.or]: [{ friend_id: user.id }, { friend_id: friend.id }] }
        ]
      }
    });

    if (friend || user) {
      return res.render('chat', { messages, user, friend });
    } else {
      return res.status(500).send('Usuario não encontrado');
    }
  }
);

module.exports = routes;
