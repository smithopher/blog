module.exports = function(sequelize, DataTypes) {
	var tblposts = sequelize.define("tblposts", {
		postid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
    authorid:{
      type: DataTypes.INTEGER
    },
    title:{
      type: DataTypes.STRING
    },
    content:{
      type: DataTypes.STRING
    },
    datecreated:{
      type: DataTypes.STRING
    },
    archived:{
      type: DataTypes.BOOLEAN
    }
	},{
		timestamps: false,
		tableName: "tblposts"
	});
    return tblposts;
};
