/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var board = sequelize.define('board', {
    password: {
      type: DataTypes.INTEGER(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment : {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'board',
    comment: '질문답변 게시판',
     charset: 'utf8',
     collate: 'utf8_general_ci'
  });
  return board;
};
