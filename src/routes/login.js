function login(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }

  if (req.query.fail) {
    return res.render('login', { message: 'Usuário ou senha inválidos' });
  } else {
    return res.render('login', { message: null });
  }
}

module.exports = login;
