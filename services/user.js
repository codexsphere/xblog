'use strict'
const User  = require('../db').models.User;

module.exports = {
  getUserById: (id) => {
    return  new Promise(function(resolve, reject) {
      User.findById(id, {
        attributes: [
        "firstname",
        "lastname",
        "username",
        "email",
        "fb_id",
        "google_id",
        "twitter_id",
        "created_at",
        "updated_at"
      ],
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
