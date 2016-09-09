# Blog!

#### Welcome to my Blog API!

I have hosted this API on Heroku to save you the time of configuring the database, but please feel free to view the code associated with my API!

Here's a simple set of instructions to get you started!

Since Heroku may need a few seconds to spin back up before it's ready to use, you can get things moving by using the following command in command line:

curl 'http://obscure-caverns-98424.herokuapp.com/'

Now let's get you started on the good stuff!

#### Reading Posts:

First, you should send a GET request to receive a master list of each post. You can do so by running the following command in command line:

curl 'http://obscure-caverns-98424.herokuapp.com/posts'

This will bring you the master list containing postid, title, and authorid and author name.

To view a specific post along with content and comments, simply run this command in command line:

curl 'http://obscure-caverns-98424.herokuapp.com/getPost?postid=POSTID'

where POSTID is any valid postid found in the master list retrieved above.

#### Creating comments:

To create a comment, you can simply run the following command in command line:

curl -X POST -H 'Content-Type: application/json' -d '{"postid":POSTID, "comment":COMMENT, "commenter":COMMENTER}' 'http://obscure-caverns-98424.herokuapp.com/comment'

where POSTID is any valid postid, COMMENT can be any string, and COMMENTER can be null, but is where you would disclose your name, if you wish to, also as a string.

#### Finding master list of authors:

To find a comprehensive list of the registered authors in this blog, you can use this command:

curl 'http://obscure-caverns-98424.herokuapp.com/authors'

This will return an array of objects containing author information.

#### Viewing posts written by each author:

To find a list of posts written by each author, you can use the following command:

curl 'http://obscure-caverns-98424.herokuapp.com/authorPosts?authorid=AUTHORID'

where AUTHORID is found in the array of authors from the master list of authors.

#### Creating a user name as an author:

To create a post, you will need to be authenticated as an author. Don't worry, it's easy to create authors! All you need to do is throw this into command line:

curl -X POST -H 'Content-Type: application/json' -d '{"email":EMAIL,"name":NAME,"password":PASSWORD}' 'http://obscure-caverns-98424.herokuapp.com/author/new'

where EMAIL is your email address, NAME is your full name, and PASSWORD is the password you wish to use for logging in and creating posts (EMAIL, NAME, and PASSWORD each need to be entered as strings enclosed in "").

#### Creating a post:

Now that you have a valid login, you will need to actually use it! To log in, you will need to enter this command into command line:

curl 'http://obscure-caverns-98424.herokuapp.com/authLogin/STRING?email=EMAIL&password=PASSWORD'

where STRING can literally be ANY string, EMAIL is the email address you used to create your account, and PASSWORD is the password associated with that email. The response will give you a token, you will need this for the next step.

Now you're ready to use the command to create the actual post! In order to create the post, you will need to use the following command:

curl -X POST -H 'Content-Type: application/json' -d '{"token":TOKEN,"email":EMAIL,"title":TITLE,"content":CONTENT}' 'http://obscure-caverns-98424.herokuapp.com/newpost'

where TOKEN is the token you received from hitting the /authLogin path, EMAIL is your email you used to create the login, and TITLE is the title of your new post (this is optional, you can omit this from the request) and CONTENT is the content of the post.
