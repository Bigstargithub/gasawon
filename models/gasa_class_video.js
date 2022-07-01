const { Sequelize } = require('sequelize')
const models = require('../models')

module.exports = function(sequelize, dataTypes) {
  const gasa_class_video = sequelize.define('gasa_class_video', {
    gclvseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '가사원 클래스 영상 고유번호'
    },
    gclseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: 'gasa_class.gclseq'
    },
    gcvseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: 'gasa_video.gcvseq'
    },
    regdt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      comment: '등록일시'
    },
    order_no: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "가사원 클래스 영상 순서"
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  return gasa_class_video
}