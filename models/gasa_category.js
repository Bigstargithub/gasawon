const { Sequelize } = require('sequelize')
const models = require('../models')

module.exports = function(sequelize, dataTypes) {
  const gasa_category = sequelize.define('gasa_category', {
    gcseq: {type: Sequelize.INTEGER(10).UNSIGNED, primaryKey: true, 
      autoIncrement: true, comment: "가사원 카테고리 고유번호"},
    gcname: {type: Sequelize.STRING(50), allowNull: false,
      comment: "가사원 카테고리 이름"
    },
    gcshow_yn: {type: Sequelize.STRING(1), allowNull: false, 
      defaultValue: "N", comment: "가사원 카테고리 노출 여부"
    },
    gcorder: {type: Sequelize.INTEGER(10).UNSIGNED, allowNull: false,
      defaultValue: 0, comment: "가사원 카테고리 순서"},
    regdt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW, 
      comment: "카테고리 등록일시"},
    order_no: {type: Sequelize.INTEGER(10).UNSIGNED, allowNull: false,
      defaultValue: 0, comment: "카테고리 순서"}
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  return gasa_category
}