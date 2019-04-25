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

let Group = DataBase.define('Group', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    comment: '分组ID'
  },
  name: {
    type: STRING(64),
    allowNull: false,
    comment: '分组名称'
  },
}, {
  timestamps: true,
  underscored: true,
  paranoid: true,
  freezeTableName: true,
  tableName: 'group',
  comment: '联系人分组表',
  charset: 'utf8',
  collate: 'utf8_general_ci',
});

module.exports = Group;