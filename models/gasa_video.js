const { Sequelize } = require('sequelize')
const models = require('.')

module.exports = function (sequelize, dataTypes) {
  const gasa_video = sequelize.define('gasa_video', {
    gcvseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '가사원 영상 고유번호'
    },
    gcv_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: '가사원 영상 이름'
    },
    gcv_tc_name: {
      type: Sequelize.STRING(20),
      comment: '가사원 영상 강사명'
    },
    gcv_show_yn: {
      type: Sequelize.STRING(1), 
      allowNull: false,
      defaultValue: 'N',
      comment: '가사원 영상 노출여부'
    },
    gcv_thumb: {
      type: Sequelize.STRING(100),
      comment: '가사원 영상 썸네일'
    },
    gcv_vimeo_key: {
      type: Sequelize.STRING(100),
      comment: '가사원 vimeo key'
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  return gasa_video
}