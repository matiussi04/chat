function register(req, res) {
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
}

module.exports = register;
