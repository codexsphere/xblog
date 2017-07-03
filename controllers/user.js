'use strict'
const User  = require('../db').models.User;
const UserService  = require('../services/user');

module.exports = {
  // getUserById : (req, res) => {
  //   var id = req.params.id || 0;
  //   UserService.getUserById(id)
  //   .then(result => res.json(result))
  //   .catch(error => {
  //     res.status(400).json({ msg: error.message });
  //   });
  // },
  getUsers : (req, res) => {
    var id = 0;
    if (req.user) {
      if (req.user.id) {
        id = req.user.id;
      }
    }
    User.findAll({
      attributes: ['id', 'username', 'email'],
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(400).json({ msg: error.message });
    });
  },



  getUserByIdPage : (req, res) => {
    var util = require('util');
    req.checkParams('id', 'Invalid id').isInt();
    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        console.log(result);
        return;
      }
    });

    var id = req.params.id;
    UserService.getUserById(id)
    .then(result => res.json(result))
    .catch(error => {
      res.status(400).json({ msg: error.message });
    });
  },

  getMyProfilePage : (req, res) => {

    // var id = req.session;
    var id = 1;
    UserService.getUserById(id)
    .then(result => {
      console.log(result);
      // res.json(result);
      res.render("profile", {user:result});
    })
    .catch(error => {
      res.status(400).json({ msg: error.message });
    });
  },



  deleteUser: (req, res) => {
      var id = req.user.id || 0;
    User.destroy({ where: { id: id } })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(400).json({ msg: error.message });
    });
  },



  getLoginPage: (req, res) => {
      res.render('login');
  },

  postLogin: (req, res) => {



    // passport.authenticate('local', { failureRedirect: '/login' }),
// function(req, res) {
//   res.redirect('/');
//
//     console.log(req.body);
//     var mysql = require('mysql');
//     var session = require('express-session');
//     var MySQLStore = require('express-mysql-session')(session);
//
//     var options = {
//       host: 'localhost',
//       port: 3306,
//       user: 'db_user',
//       password: 'password',
//       database: 'db_name'
//     };
//
//     var connection = mysql.createConnection(options); // or mysql.createPool(options);
//     var sessionStore = new MySQLStore({}/* session store options */, connection);
//     res.render('login');
  },

  getRegisterUserPage: (req, res) => {
      res.render('register');
  },

  postRegisterUser: (req, res) => {
    User.create(req.body)
    .then(result => res.json(result))
    .catch(error => {
      console.log(error);
      res.status(400).json({ msg: error.message });
    });
  },

  updateUser: (req, res) => {
    User.update(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res.status(400).json({ msg: error.message });
    });
  }
};
