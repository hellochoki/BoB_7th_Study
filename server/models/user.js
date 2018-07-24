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
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'user',
		comment: "관리자 계정",
		charset: 'utf8'
	});
	return user;
};