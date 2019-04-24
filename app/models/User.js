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

let User = DataBase.define('User', {
  id: {
    type: BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '用户ID'
  },
  email: {
    type: STRING,
    allowNull: false,
    comment: '邮箱',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
}, {
  timestamps: true,
  underscored: true,
  paranoid: true,
  freezeTableName: true,
  tableName: 'user',
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

module.exports = User;