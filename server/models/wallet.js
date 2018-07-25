module.exports = function(sequelize, DataTypes) {
	var wallet = sequelize.define('wallet', {
		w_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		bitcoin: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue : 0
		},
		ripple: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue : 0
		},
		neo: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue : 0
		},
		eth: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue : 0
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
		tableName: 'wallet',
		comment: "지갑",
	
		charset: 'utf8'
	
	});
	return wallet;
};