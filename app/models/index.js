const Sequelize = require('sequelize');
const User = require('./User');

User.sync();

module.exports = {
  User: User,
  Sequelize: Sequelize,
};