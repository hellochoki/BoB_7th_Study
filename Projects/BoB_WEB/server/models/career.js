module.exports = function(sequelize, DataTypes) {
	var career = sequelize.define('career', {
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
		career: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "실적"
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
		tableName: 'career',
		comment: "실적",
		charset: 'utf8'
	});
	return career;
};