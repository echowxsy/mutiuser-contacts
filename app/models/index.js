const Sequelize = require('sequelize');
const User = require('./User');
const Contact = require('./Contact');

User.hasMany(Contact);
Contact.belongsTo(User);

User.sync();
Contact.sync();

module.exports = {
  User: User,
  Contact: Contact,
  Sequelize: Sequelize,
};