var Sequelize = require('sequelize');
var config = require('../../.git/config.js');
var pg = require('pg');
var blogDB = new Sequelize(config.db, config.userName, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging
});

pg.defaults.ssl = true;

var models = [
  {
  	name: "tblposts",
  	file: "./tblposts.js"
	},
  {
    name: "tblauthors",
    file: "./tblauthors.js"
  },
  {
    name: "tblcomments",
    file: "./tblcomments.js"
  }
];

models.forEach(function(item){
	module.exports[item.name] = blogDB.import(__dirname + '/' + item.file);
});

console.log('models complete');
