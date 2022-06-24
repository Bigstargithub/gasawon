const { Sequelize } = require('sequelize')
const models = require('../models')

module.exports = function(sequelize, dataTypes) {
  const gasa_class_user = sequelize.define('gasa_class_user', {
    gcuseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "가사원 클래스 권한 유저 고유번호"
    },
    guseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "gasa_user.guseq",
    },
    gclseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "gasa_class.gclseq"
    },
    regdt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      comment: "등록일시"
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  return gasa_class_user
}