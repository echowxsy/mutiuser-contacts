const Sequelize = require('sequelize');
const User = require('./User');
const Contact = require('./Contact');
const Group = require('./Group');

User.hasMany(Contact);
Contact.belongsTo(User);
User.hasMany(Group);
Group.belongsTo(User);
Group.hasMany(Contact);
Contact.belongsTo(Group);

User.sync();
Contact.sync();
Group.sync();

module.exports = {
  User: User,
  Contact: Contact,
  Group: Group,
  Sequelize: Sequelize,
};