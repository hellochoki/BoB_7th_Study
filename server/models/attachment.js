module.exports = function(sequelize, DataTypes) {
	var attachment = sequelize.define('attachment', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "파일 이름"
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "파일 경로"
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "파일 타입"
		},
		size: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			comment: "파일 크기"
		},
		kind: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			comment: "0: 멤버 사진, 1: 프로젝트페이지의 사진, 3:정보통신대학, 4:소프트웨어대학"
		},
		postId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			comment: "연결된 게시글 id"
		}
	}, {
		tableName: 'attachment',
		comment: "첨부파일",
		charset: 'utf8'
	});
	return attachment;
}