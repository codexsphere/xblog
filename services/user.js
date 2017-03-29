'use strict'
const User  = require('../db').models.User;

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

};
