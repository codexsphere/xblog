'use strict'
const User  = require('../db').models.User;
const UserService  = require('../services/user');
const PostService  = require('../services/post');

module.exports = {

  getAdminIndex : (req, res) => {
    req.user = 0;
    var id = 0;
    PostService.getPosts(id)
    .then((result) => {
      res.render("admin/index", {
        posts:result,
        title:"blog",
      })
    })
    .catch(error => {
      res.status(400).json({ msg: error.message });
    });
  },
  getPosts : (req, res) => {
    req.user = 0;
    var id = 0;
    PostService.getPosts(id)
    .then((result) => res.json(result))
    .catch(error => {
      res.status(400).json({ msg: error.message });
    });
  },


  //
  // getUserById : (req, res) => {
  //   var util = require('util');
  //   req.checkParams('id', 'Invalid id').isInt();
  //   req.getValidationResult().then(function(result) {
  //     if (!result.isEmpty()) {
  //       res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
  //       console.log(result);
  //       return;
  //     }
  //   });
  //
  //   var id = req.params.id;
  //   UserService.getUserById(id)
  //   .then(result => res.json(result))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
  //   });
  // },
  //
  //
  //
  // deleteUser: (req, res) => {
  //     var id = req.user.id || 0;
  //   User.destroy({ where: { id: id } })
  //   .then(result => res.sendStatus(204))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
  //   });
  // },
  //
  //
  //
  // createUser: (req, res) => {
  //   User.create(req.body)
  //   .then(result => res.json(result))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
  //   });
  // },
  // updateUser: (req, res) => {
  //   User.update(req.body)
  //   .then(result => res.json(result))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
  //   });
  // }
};
