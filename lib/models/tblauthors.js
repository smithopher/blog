module.exports = function(sequelize, DataTypes) {
	var tblauthors = sequelize.define("tblauthors", {
		authorid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
    name:{
      type: DataTypes.STRING
    },
    email:{
      type: DataTypes.STRING
    },
    password:{
      type: DataTypes.STRING
    }
	},{
		timestamps: false,
		tableName: "tblauthors"
	});
    return tblauthors;
};
