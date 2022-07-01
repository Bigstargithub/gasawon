const { Sequelize, DataTypes } = require('sequelize')
const models = require('../models')

module.exports = function (sequelize, dataTypes) {
  const gasa_class = sequelize.define('gasa_class', {
    gclseq: { type: Sequelize.INTEGER(10).UNSIGNED, 
      primaryKey: true,
      autoIncrement: true, comment: "가사원 클래스 고유번호"},
    gcl_name: { type: Sequelize.STRING(50), allowNull: false,
    comment: "가사원 클래스 이름"},
    gcl_tc_name: { type: Sequelize.STRING(20), allowNull: false,
      comment: "가사원 클래스 강사명"},
    gcl_show_yn: { type: Sequelize.STRING(1), allowNull: false,
      defaultValue: 'N', comment: '가사원 클래스 노출 여부(Y: 노출, N: 숨김)'},
    gcl_opn_d: { type: Sequelize.DATEONLY, defaultValue: DataTypes.NOW,
      comment: "가사원 클래스 오픈일자"},
    gcl_opn_t: { type: Sequelize.INTEGER(2).UNSIGNED, defaultValue: 0,
      comment: "가사원 클래스 오픈시간"},
    gcl_thumb: { type: Sequelize.STRING(100), comment: "가사원 클래스 썸네일"}
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  return gasa_class
}