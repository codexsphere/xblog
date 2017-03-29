'use strict'
const User  = require('../db').models.User;
const UserService  = require('../services/user');

module.exports = {
  // getUserById : (req, res) => {
  //   var id = req.params.id || 0;
  //   UserService.getUserById(id)
  //   .then(result => res.json(result))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
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
      attributes: ['id', 'name', 'email'],
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    });
  },



  getUserById : (req, res) => {
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
      res.status(412).json({ msg: error.message });
    });
  },



  deleteUser: (req, res) => {
      var id = req.user.id || 0;
    User.destroy({ where: { id: id } })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    });
  },



  createUser: (req, res) => {
    User.create(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    });
  },
  updateUser: (req, res) => {
    User.update(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    });
  }
};
