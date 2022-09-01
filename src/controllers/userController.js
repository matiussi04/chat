const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async store(req, res) {
    const { email, username, password, confirm_password } = req.body;

    if ((await User.findAll({ where: { email } })).length !== 0) {
      return res.redirect('/register?emailExist=true');
    }

    if ((await User.findAll({ where: { username } })).length !== 0) {
      return res.redirect('/register?usernameExist=true');
    }

    if (username.length < 6 || username.length > 14) {
      return res.redirect('/register?usernameLength=true');
    }

    if (password.length < 8) {
      return res.redirect('/register?passwordLength=true');
    }

    if (password !== confirm_password) {
      return res.redirect('/register?ConfirmPasswordIsDiferent=true');
    }

    try {
      const salt = bcrypt.genSaltSync();
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = await User.create({
        email,
        username,
        password: hashPassword
      });

      return res.redirect('/');
    } catch (error) {
      console.log(error);
      return res.status(500).redirect('/register');
    }
  }
};
