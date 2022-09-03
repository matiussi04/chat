const { Op } = require('sequelize');
const User = require('../models/User');

async function home(req, res) {
  const { user } = req;
  const friends = await User.findAll({
    where: {
      id: {
        [Op.not]: [user.id]
      }
    }
  });
  res.render('index', { friends, user });
}

module.exports = home;
