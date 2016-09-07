var config = require('./.git/config.js');
var express = require('express');
var functions = require('./lib/functions');
var expressjwt = require("express-jwt");
var jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
var validateJwt = expressjwt({
	secret: config.secret
});
var bcrypt = require('bcrypt');
require('./lib/models');

var app = express();

// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

app.set('port', 3000);

// performs validation of token before allowing author to submit new post
var validate = function(req, res, next){
	if(req.body && req.body.hasOwnProperty("token")) {
		req.headers.authorization = "Bearer " + req.body.token;
	}
	return validateJwt(req, res, next);
};

// requires req.query.postid
app.get('/getPost', function(req, res){
  if(req.query.hasOwnProperty('postid')){
    functions.getPostByID({
      postid: req.query.postid
    }, function(err, post){
      if(err) return res.send(err);
      console.log(post)
      if(post){
        return res.send({
          status: true,
          message: 'Post found successfully',
          post: post
        });
      } else {
        return res.send({
          status: false,
          message: 'Could not find post with that ID!'
        });
      }
    });
  } else {
    return res.send({
      status: false,
      message: 'postid is required!'
    });
  }
});

// requires no input, returns list of authors in database
app.get('/authors', function(req, res){
  functions.getAuthors(function(err, authors){
    if(err) return res.send(err);
    return res.send(authors);
  });
});

// requires req.query.authorid
app.get('/authorPosts', function(req, res){
  if(req.query.hasOwnProperty('authorid')){
    functions.getPostsByAuthor({
      authorid: req.query.authorid
    }, function(err, posts){
      if(err) return res.send(err);
      return res.send({
        status: true,
        response: posts
      });
    });
  } else {
    return res.send({
      status: false,
      message: 'Author ID is required!'
    });
  }
});

// requires req.query.token, req.query.email, && req.query.content. req.query.title is optional.
app.post('/newpost', validate, function(req, res){
  if(req.body.hasOwnProperty('email') && req.body.hasOwnProperty('content')){
    functions.newPost({
      email: req.body.email,
      title: req.body.title,
      content: req.body.content
    }, function(err, post){
      if(err) return res.send(err);
      return res.send({
        status: true,
        message: 'post created successfully',
        post: post
      });
    });
  } else {
    return res.send({
      status: false,
      message: 'email and content are required! title is optional.'
    });
  }
});

// requires req.query.email and req.query password, :sessionid can be any string.
app.get("/authLogin/:sessionid", function(req, res){
  if(req.query.hasOwnProperty('email') && req.query.hasOwnProperty('password')){
    functions.comparePassword({
      email: req.query.email,
      password: req.query.password
    }, function(err, authenticated){
      if(err) return res.send(err);
      if(authenticated){
        var token = jwt.sign({
      		sessionid: req.params.sessionid
      	}, config.secret, {
      		expiresIn: 60000 * 24
      	});
      	res.send({
          status: true,
          message: 'authentication successful',
          token: token
        });
      } else {
        res.send({
          status: false,
          message: 'Unknown email/password combination!'
        });
      }
    });
  } else {
    res.send({
      status: false,
      message: 'User email and password required in query string!'
    });
  }
});

// requires req.query.email, req.query.name, req.query.password
app.post('/author/new', function(req, res){
  functions.createAuthor({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }, function(err, authorCreated){
    if(err) return res.send(err);
    if(authorCreated === 'exists'){
      return res.send({
        status: false,
        message: 'That email is already registered to an author!'
      });
    } else {
      return res.send({
        status: true,
        message: 'New author created successfully',
        author: authorCreated
      });
    }
  });
});

// route to submit comment on a particular post
app.post('/comment', function(req, res){
  if(req.body.hasOwnProperty('postid') && req.body.hasOwnProperty('comment')){
    functions.createComment({
      postid: req.body.postid,
      comment: req.body.comment,
      commenter: req.body.commenter ? req.body.commenter : null
    }, function(err, comment){
      if(err) return res.send(err);
      res.send({
        status: true,
        message: 'Comment created successfully'
      });
    });
  } else {
    res.send({
      status: false,
      message: 'postid and comment required!'
    });
  }
});

app.get('/posts', function(req, res){
  functions.getPosts(function(err, posts){
    if(err) return res.send(err);
    if(posts.length > 0){
      res.send({
        status: true,
        message: 'Found posts successfully',
        posts: posts
      });
    } else {
      res.send({
        status: false,
        message: 'Couldn\'t find any posts!'
      });
    }
  });
});

// no requirements, simple landing url for api
app.get('/', function(req, res){
  res.json({
    status: true,
    message: 'Welcome to my KustomerBlog API!',
    author: 'Christopher Smith'
  });
});

app.listen(app.get('port'), function() {
  console.log('App listening on http://localhost:%s', app.get('port'));
});
