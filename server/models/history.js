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
		}
	}, {
		tableName: 'history',
		comment: "연혁",
		charset: 'utf8'
	});
	return history;
};