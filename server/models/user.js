module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		w_num: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'user',
		comment: "관리자 계정",
		charset: 'utf8'
	});
	return user;
};