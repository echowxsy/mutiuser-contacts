const Sequelize = require('sequelize');
const DataBase = require('../tools/DataBase');

const {
  STRING,
  BIGINT,
  BOOLEAN,
  TEXT,
  INTEGER,
  FLOAT
} = Sequelize;

let Contact = DataBase.define('Contact', {
  id: {
    type: BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '通讯录ID'
  },
  name: {
    type: STRING(64),
    allowNull: false,
    comment: '姓名'
  },
  phoneNumber: {
    type: STRING(32),
    allowNull: false,
    comment: '电话号码'
  },
  birthday: {
    type: STRING(10),
    allowNull: true,
    comment: '生日'
  },
}, {
  timestamps: true,
  underscored: true,
  paranoid: true,
  freezeTableName: true,
  comment: '联系人信息表',
  tableName: 'contact',
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = Contact;