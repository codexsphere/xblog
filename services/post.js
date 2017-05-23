'use strict'
const User  = require('../db').models.User;
const Post  = require('../db').models.Post;
const History  = require('../db').models.History;

module.exports = {
      getUserById: (id) => {
        return  new Promise(function(resolve, reject) {
          User.findById(id, {
            attributes: ['id', 'name', 'email'],
          })
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
        });

      },
      getPostById: (id) => {
        return  new Promise(function(resolve, reject) {
          User.findById(id, {
            attributes: ['id', 'name', 'email'],
          })
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
        });

      },
      getPosts: (id) => {
        return  new Promise(function(resolve, reject) {
          // where: {
          //   userid: id
          // }
          Post.findAll({
            // attributes: ['id', 'name', 'email'],
          })
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
        });

      },

};
