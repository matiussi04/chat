const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Message = require('../models/Message');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

User.init(connection);
Message.init(connection);

Message.associate(connection.models);

module.exports = connection;
