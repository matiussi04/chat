const passport = require('passport');

const authentication = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/?fail=true'
});

module.exports = authentication;
