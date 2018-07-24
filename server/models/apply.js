module.exports = function(sequelize, DataTypes) {
	var apply = sequelize.define('apply', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "지원 글 제목"
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: "지원 글 내용"
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "작성자 이름"
		}
	}, {
		tableName: 'apply',
		comment: "지원 페이지",
		charset: 'utf8'
	});
	return apply;
};