const { Sequelize } = require('sequelize')
const models = require('../models')

module.exports = function(sequelize, dataTypes) {
  const gasa_user = sequelize.define('gasa_user', {
    guseq: {type: Sequelize.INTEGER(10).UNSIGNED, primaryKey: true, autoIncrement: true, comment:"가사원 회원고유번호"},
    guid: {type: Sequelize.STRING(50), allowNull: false, comment: "가사원 회원아이디"},
    gupass: {type: Sequelize.STRING(100).BINARY, allowNull: false, comment: "가사원 회원비밀번호"},
    guname: {type: Sequelize.STRING(20), comment: "가사원 회원이름"},
    guemail: {type: Sequelize.STRING(50), comment: "가사원 회원이메일"},
    guphone: {type: Sequelize.STRING(20), comment:"가사원 회원전화번호"},
    regdt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW, comment: "회원 등록 날짜"}
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  return gasa_user
}
