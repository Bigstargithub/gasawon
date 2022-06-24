const { Sequelize } = require('sequelize')
const models = require('../models')

module.exports = function(sequelize, dataTypes) {
  const gasa_category_class = sequelize.define('gasa_category_class', {
    gccseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '가사원 카테고리 클래스 고유번호'
    },
    gcseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: 'gasa_category.gcseq'
    },
    gclseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: 'gasa_class.gclseq'
    },
    regdt: {
      type: Sequelize.DATE, 
      defaultValue: Sequelize.NOW,
      comment: '등록일시'
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  return gasa_category_class
}