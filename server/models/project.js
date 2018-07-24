module.exports = function(sequelize, DataTypes) {
	var project = sequelize.define('project', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "프로젝트 이름"
		},
		PM: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "PM project master"
		},
		member: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "프로젝트 멤버"
		},
		link: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "프로젝트 링크"
		},
		introduction: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "프로젝트 소개"
		}
	}, {
		tableName: 'project',
		comment: "프로젝트 소개",
		charset: 'utf8'
	});
	return project;
};