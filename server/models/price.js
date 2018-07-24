module.exports = function(sequelize, DataTypes) {
	var price = sequelize.define('price', {
		p_bitcoin: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		p_ripple: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		p_neo: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		p_eth: {
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
		tableName: 'price',
		comment: "가격",
		charset: 'utf8'
	
	});
	return price;
};