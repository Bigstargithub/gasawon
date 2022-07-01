const { Sequelize, DataTypes } = require("sequelize")
const models = require("../models")

module.exports = function (sequelize, dataTypes) {
  const gasa_user_group = sequelize.define('gasa_user_group', {
    gugseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "가사원 회원 그룹 고유번호",
    },
    gug_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: "가사원 회원 그룹 이름",
    },
    guseq: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "gasa_user.guseq",
    },
    regdt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      comment: "등록일자",
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  })

  return gasa_user_group
}