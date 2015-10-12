//-------------------------------All Requires
var express = require('express');
var cookieParser = require('cookie-parser');
var time = require('time');
var session = require('express-session');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');
// var crypto = require('crypto');
var app = express();
var request = require('request');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});

//-------------------------------All .Use
app.use(express.static('public'));
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(cookieParser());
app.use(session({ secret: 'helooooooo',
                  resave: false,
                  saveUninitialized: false
                })); 
app.use(passport.initialize());
app.use(passport.session()); 

//-------------------------------- Login Authentication
passport.use(new LocalStrategy(function(username, password, done) {
  db.all('SELECT username,password FROM user WHERE username=?', username , function(err,table){
  	if(table[0].username === username && table[0].password === password){
  			done(null, { user: username });
  		}
  	else{
  		done(null, false);
  	}
  });
}));

passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  done(null, user);
});


app.post('/login', passport.authenticate('local', { 
  failureRedirect: '/accessfailed',
  successRedirect: '/lost'
}));

var loginCheck = function(req , res){
  if(req.session.passport.user===undefined){
    console.log('NOT LOGGED IN/INVALID LOGIN');
    res.redirect('/login');
  }
}

app.get('/login', function(req, res) {
        res.render('login.ejs'); 
    });

app.get('/user' , function(req,res){
	loginCheck(req,res);
	res.render('lost.ejs' , {user : req.user})
});

//-------------------------------- ROUTES

//Home Page
app.get('/' , function(req,res){
	res.render('index.ejs');
})

//Register Page
 app.get('/register', function(req, res) {
        res.render('register.ejs');
    });
 app.post('/register' , function(req,res){
 	var name = req.body.name;
 	var username = req.body.username;
 	var password = req.body.password;
 	var number = req.body.number;
 	db.run("INSERT INTO user ( name , contact_number , username , password ) VALUES (?,?,?,?)" ,
 	name,number,username,password,
 		function(err){
     	 if(err){
        throw err
      }
   }
);
 res.redirect('/login');
});



//Lost Page
app.get('/lost' , function(req,res){
    //console.log(req.user.user); CHECK USER ACTIVITY
  loginCheck(req,res);
	db.all('SELECT user.name , category, short_descr , comment_counter , content , location , post_date FROM thread INNER JOIN user ON user.user_id = thread.author INNER JOIN categories ON thread.category_id = categories.cat_id' , function(err,table){
    res.render('list.ejs' , {list:table});
	})
});

//New Post Page
app.get('/newpost' , function(req,res){
  //console.log(req.user.user); CHECK USER ACTIVITY
  db.all('SELECT category FROM categories' , function(err,table){
    res.render('newpost.ejs', {category:table});
  });
});

//Adding new post
app.post('/lost' , function(req,res){
  //  console.log(req.user.user);
	// console.log(req.body);
    db.all('SELECT user_id FROM user WHERE username=?' , req.user.user , function(err,row){
    // console.log(row[0].user_id); returns user ID/author
    var now = new time.Date();
    now.setTimezone("America/New_York");
    var date = now.getMonth()+ "/" + now.getDate()+ "/" + now.getFullYear()
    db.all('SELECT cat_id FROM categories WHERE category=?' , req.body.category , function(err,table){
      //table[0].cat_id gets Category ID
    db.run('INSERT INTO thread (author , category_id , post_date , short_descr , content , location , comment_counter) VALUES (?,?,?,?,?,?,?)',
      row[0].user_id , table[0].cat_id , date , req.body.short_descr , req.body.content , req.body.location , 0 , 
      function(err){
      if(err){
        throw err
      }
    });
    });
  });
    res.redirect('/lost');
});

//didnt get to implement this :(
 app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


//Search Page
app.get('/search?' , function(req,res){
  var target = req.query.q 
  db.all('SELECT user.name , short_descr, content, location FROM thread INNER JOIN user on user.user_id = thread.author WHERE user.name LIKE "%viki%" OR short_descr LIKE "%viki%" OR content LIKE "%viki%" OR location LIKE "%viki%" ' , function(err,row){
      console.log(row)
      console.log("Here")
    });
});


app.listen(3000,function(req,res){
	//add in time delay or whatever make it look cool...
	console.log('Connecting.....');
	console.log('Connected!');
})