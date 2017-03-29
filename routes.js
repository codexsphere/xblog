var express = require('express');
var router = express.Router();
var passport = require('passport');




var User = require('./controllers/user.js');
var Main = require('./controllers/main.js');
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


router.get('/', Main.getHomePage);
router.get('/login',
  function(req, res){
    res.render('login');
  });
router.get('/login/facebook',  passport.authenticate('facebook'));
router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect('/');
  });







router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log(req.user);
    res.render('profile', { user: req.user });
  });




router.get('/theme', Main.getTheme);

router.post('/users', User.createUser);
router.get('/users', User.getUsers);
router.get('/users/:id', User.getUserById);
router.put('/users', User.updateUser);
router.delete('/users', User.deleteUser);

module.exports = router;
