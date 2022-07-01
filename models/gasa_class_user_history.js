const { Sequelize } = require('sequelize')
const models = require('../models')

module.exports = function (sequelize, dataTypes) {
  const gasa_class_user_history = sequelize.define('gasa_class_user_history', {
    gcuhseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "가사원 클래스 시청기록 고유번호"
    },
    guseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "gasa_user.guseq"
    },
    gclseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "gasa_class.gclseq"
    },
    gcvseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "gasa_video.gcvseq"
    },
    gcl_complete: {
      type: Sequelize.STRING(1),
      allowNull: false,
      defaultValue: '0',
      comment: "클래스 시청완료 여부"
    },
    gcl_complete_date: {
      type: Sequelize.DATE,
      comment: "클래스 시청완료 일시"
    },
    gcv_complete: {
      type: Sequelize.STRING(1),
      allowNull: false,
      defaultValue: '0',
      comment: "비디오 시청완료 여부"
    },
    gcv_complete: {
      type: Sequelize.DATE,
      comment: "비디오 시청완료 일시"
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

  return gasa_class_user_history
}