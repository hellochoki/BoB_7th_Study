module.exports = function(sequelize, DataTypes) {
	var history = sequelize.define('history', {
		year: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "연도"
		},
		month: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "월"
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "내용"
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
		tableName: 'history',
		comment: "연혁",
		charset: 'utf8'
	});
	return history;
};