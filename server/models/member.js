module.exports = function(sequelize, DataTypes) {
	var member = sequelize.define('member', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "멤버 이름"
		},
		major: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "멤버 학과"
		},
		number: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "멤버 기수"
		},
		current_students: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			comment: "현재 활동중: 0, 현재 활동 아님: 1"
		},
		introduction: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "멤버 소개 (회장, 부회장)"
		},
		photo: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "멤버 사진"
		}
	}, {
		tableName: 'member',
		comment: "멤버 소개 페이지",
		charset: 'utf8'
	});
	return member;
};
