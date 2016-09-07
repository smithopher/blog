module.exports = function(sequelize, DataTypes) {
	var tblcomments = sequelize.define("tblcomments", {
		commentid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
    postid:{
      type: DataTypes.INTEGER
    },
    comment:{
      type: DataTypes.STRING
    },
    commenter:{
      type: DataTypes.STRING
    }
	},{
		timestamps: false,
		tableName: "tblcomments"
	});
    return tblcomments;
};
