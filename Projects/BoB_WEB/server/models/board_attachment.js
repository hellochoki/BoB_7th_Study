/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var board_attachment = sequelize.define('board_attachment', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    storedName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contentType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER(20),
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
    tableName: 'board_attachment',
    comment: "첨부파일 테이블",
     charset: 'utf8',
     collate: 'utf8_general_ci'
  });
  return board_attachment;
};
