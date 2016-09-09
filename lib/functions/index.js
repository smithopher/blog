var models = require('../models');
var moment = require('moment');
var bcrypt = require('bcrypt');
var _ = require('lodash');
var internals = {};

internals.getPostByID = function(input, callback){
  models.tblposts.find({
    where:{
      postid: input.postid
    },
    limit: null
  }).then(function(post){
    console.log(post)
    if(post){
      models.tblcomments.findAll({
        where:{
          postid: input.postid
        },
        raw: true
      }).then(function(comments){
        if(comments.length > 0){
          return callback(null, {
            post: post,
            comments: comments
          });
        } else {
          return callback(null, post);
        }
      }).catch(function(err){
        return callback(err);
      });
    } else {
      return callback(null, null);
    }
  }).catch(function(err){
    return callback(err);
  });
};

internals.newPost = function(input, callback){
  models.tblauthors.find({
    where:{
      email: input.email
    },
    limit: null
  }).then(function(author){
    if(author){
      models.tblposts.create({
        authorid: author.authorid,
        title: input.title ? input.title : null,
        content: input.content,
        datecreated: moment().format('YYYY-MM-DD'),
        archived: false
      }).then(function(newPost){
        return callback(null, newPost)
      }).catch(function(err){
        return callback(err);
      });
    } else {
      return callback('That email does not match any existing author!')
    }
  }).catch(function(err){
    return callback(err);
  });
};

internals.generatePassword = function(input, callback){
  var saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(input.password, salt, function(err, hash){
      if(err) return callback(err);
      return callback(null, hash);
    });
  });
};

internals.createAuthor = function(input, callback){
  models.tblauthors.find({
    where:{
      email: input.email
    },
    limit: null
  }).then(function(authorExists){
    if(authorExists){
      return callback(null, 'exists');
    } else {
      internals.generatePassword({
        password: input.password
      }, function(err, password){
        if(err) return callback(err);
        models.tblauthors.create({
          name: input.name,
          email: input.email,
          password: password
        }).then(function(author){
          delete author.password;
          return callback(null, author);
        }).catch(function(err){
          return callback(err);
        });
      });
    }
  }).catch(function(err){
    return callback(err);
  });
};

internals.comparePassword = function(input, callback){
  models.tblauthors.find({
    where:{
      email: input.email
    },
    limit: null
  }).then(function(author){
    if(author){
      bcrypt.compare(input.password, author.password, function(err, res){
        if(err) return callback(err);
        return callback(null, res);
      });
    } else {
      return callback(null, false);
    }
  }).catch(function(err){
    return callback(err);
  });
};

internals.getAuthors = function(callback){
  models.tblauthors.findAll({
    attributes: ['authorid', 'name', 'email'],
    raw: true
  }).then(function(authors){
    return callback(null, authors);
  }).catch(function(err){
    return callback(err);
  });
};

internals.getPostsByAuthor = function(input, callback){
  models.tblposts.findAll({
    where:{
      authorid: input.authorid
    },
    raw: true
  }).then(function(posts){
    return callback(null, posts);
  }).catch(function(err){
    return callback(err);
  });
};

internals.createComment = function(input, callback){
  models.tblcomments.create({
    postid: input.postid,
    comment: input.comment,
    commenter: input.commenter
  }).then(function(comment){
    return callback(null, comment);
  }).catch(function(err){
    return callback(err);
  });
};

internals.getPosts = function(callback){
  models.tblposts.findAll({
    attributes: ['postid', 'title', 'authorid'],
    where:{
      archived: false
    },
    raw: true
  }).then(function(posts){
    var posts = posts;
    var authorIDs = _.chain(posts)
      .map('authorid')
      .uniq()
      .value();
    models.tblauthors.findAll({
      where:{
        authorid:{
          $in: authorIDs
        },
      },
      raw: true
    }).then(function(authors){
      posts.forEach(function(e){
        e.authorName = _.find(authors, {authorid: e.authorid}).name;
      });
      return callback(null, posts);
    }).catch(function(err){
      return callback(err);
    });
  }).catch(function(err){
    return callback(err);
  });
};

module.exports = internals;
