var express = require('express');
var router = express.Router();
var passport = require('passport');




var User = require('./controllers/user.js');
var UserAPI = require('./controllers/apiV1/user.js');
var Main = require('./controllers/main.js');
var Admin = require('./controllers/admin.js');
// var Login = require('./controllers/login.js');

var UserService = require('./services/user.js');

//fb login
// router.get('/login/facebook/return', User.LoginFBReturn);
// { id: '511684829221447',
//   displayName: 'Ace Besmonte',
//   name: {},
//   provider: 'facebook',
//   _raw: '{"name":"Ace Besmonte","id":"511684829221447"}',
//   _json: { name: 'Ace Besmonte', id: '511684829221447' } }


router.get('/v1/admin', Admin.getAdminIndex);
router.get('/v1/admin/posts/new', Admin.getAdminNewPost);



router.get('/', Main.getHomePage);
router.get('/v1/login', User.getLoginPage);
// router.post('/v1/login', User.postLogin);
router.post('/v1/login', function(req, res, next) {
  console.log(req.body);
  next()
},
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log("route profile");
    console.log(req.user);
    res.render('profile', { user: JSON.stringify(req.user) });
});




router.get('/v1/register', User.getRegisterUserPage);
router.get('/v1/myprofile', User.getMyProfilePage);
router.post('/v1/register', User.postRegisterUser);
// router.get('/v1/login/facebook',  passport.authenticate('facebook'));
// router.get('/v1/login/facebook/return',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//
//     res.redirect('/');
//   });









router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log(req.user);
    res.render('profile', { user: req.user });
  });




router.get('/theme', Main.getTheme);
router.get('/error', function(req, res){
    res.render('error', { message: "error" , error:{status:"live", stack:"login failure"}});
  });

// router.LOGIN('/v1/users', User.createUser);
router.get('/v1/users', User.getUsers);
router.put('/v1/users/:id', User.updateUser);
router.delete('/v1/users', User.deleteUser);


/**
  API
**/

router.get('/api/v1/users/:id', UserAPI.getUserById);


module.exports = router;


/**
http://localhost:7777/api/v1/users/1






**/
