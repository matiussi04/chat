const Message = require('../models/Message');
const User = require('../models/User');
const { Op } = require('sequelize');

async function chat(req, res) {
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

module.exports = chat;
