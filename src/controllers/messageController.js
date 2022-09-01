const Message = require('../models/Message');
const User = require('../models/User');

module.exports = {
  async store(dados) {
    console.log(dados);

    const user = await User.findByPk(dados.user_id);
    const friend = await User.findByPk(dados.friend_id);

    const message = await Message.create({
      text: dados.msg,
      user_id: user.id,
      friend_id: friend.id
    });

    console.log(message);
  }
};
