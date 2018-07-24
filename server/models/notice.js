/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var notice= sequelize.define('notice', {
    post : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postType : {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment : '0: contact, 1: notice'
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      createdAt: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false
        },
        updatedAt: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false
        }

  }, {
    tableName: 'notice',
    comment: "공지사항, contact 내용저장",
     charset: 'utf8',
     collate: 'utf8_general_ci'
  });
  return notice;
};
