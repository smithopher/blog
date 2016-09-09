var functions = require("../lib/functions");
var should = require("should");
var bcrypt = require('bcrypt');

describe("Function Tests", function(){

	describe("#getPostByID()", function(){
		it("should return object with postid and author email", function(){
      functions.getPostByID({
        postid: 1
      }, function(err, post){
        should.not.exist(err);
        should(post).have.property('postid', 1);
      });
		});
    it("should complete without an error", function(){
      functions.getPostByID({
        postid: 1
      }, function(err, post){
        should.not.exist(err);
      });
    });
	});

  describe("#generatePassword()", function(){
    it("should return hash that matches password after compare", function(){
      functions.generatePassword({
        password: 'password'
      }, function(err, hash){
        bcrypt.compare(input.password, author.password, function(err, res){
          should.not.exist(err);
          should(res).be.exactly(true);
        });
      });
    });
    it("should complete without an error", function(){
      functions.generatePassword({
        password: 'password'
      }, function(err, hash){
        bcrypt.compare(input.password, author.password, function(err, res){
          should.not.exist(err);
        });
      });
    });
  });

  describe("#getAuthors()", function(){
    it("should return an array of authors", function(){
      functions.getAuthors(function(err, authors){
        should.not.exist(err);
        should(authors).be.instanceof(Array);
      });
    });
    it("should complete without an error", function(){
      functions.getAuthors(function(err, authors){
        should.not.exist(err);
      });
    });
  });

  describe("#getPostsByAuthor()", function(){
    it("should return array of posts by an author", function(){
      functions.getPostsByAuthor({
        authorid: 1
      }, function(err, posts){
        should(posts).be.instanceof(Array);
      });
    });
    it("should complete without an error", function(){
      functions.getPostsByAuthor({
        authorid: 1
      }, function(err, posts){
        should.not.exist(err);
      });
    });
  });

  describe("#createComment()", function(){
    it("should create comment without error", function(){
      functions.createComment({
        postid: 1,
        comment: "this test shall pass!",
        commenter: "christopher"
      }, function(err, comment){
        should.not.exist(err);
        should(comment).have.property('postid', 1);
      });
    });
  });

  describe("#newPost()", function(){
    it("should create post without error", function(){
      functions.newPost({
        email: "kaits@my.sister",
        title: "this test shall also pass",
        content: "and it has"
      }, function(err, post){
        should.not.exist(err);
        should(post).have.property('authorid', 1);
      });
    });
  });

  describe("#createAuthor()", function(){
    it("should create author without error", function(){
      functions.createAuthor({
        email: 'kustomer@blog.com',
        password: 'password',
        name: 'kustomer'
      }, function(err, author){
        should.not.exist(err);
        should(author).have.property("name", "kustomer")
      })
    });
  });

});
