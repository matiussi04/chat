function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/?fail=true');
}

module.exports = authenticationMiddleware;
