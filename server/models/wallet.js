module.exports = function(sequelize, DataTypes) {
	var wallet = sequelize.define('wallet', {
		w_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		bitcoin: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ripple: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		neo: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		eth: {
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
		tableName: 'wallet',
		comment: "지갑",
		classMethods:{
			associate: function(models){
				wallet.belongsTo(models.user,{foreignKey: {w_num: 'w_id',allowNull: false},onDelete: 'CASCADE', onUpdate: 'CASCADE'});
		},
		charset: 'utf8'
	}
	});
	return wallet;
};