const Users  = require('../db').Users;

module.exports = {
  getHomePage : (req, res) => {
      res.status(200);
      res.render("index", {title: "EXPRESS-SEQUELIZE"})
  },
  getTheme : (req, res) => {
      res.status(200);
      res.render("theme", {title: "EXPRESS-SEQUELIZE"})
  },
  // deleteUsers: (req, res) => {
  //   Users.destroy({ where: { id: req.user.id } })
  //   .then(result => res.sendStatus(204))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
  //   });
  // },
  // createUsers: (req, res) => {
  //   Users.create(req.body)
  //   .then(result => res.json(result))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
  //   });
  // }
  // updateUsers: (req, res) => {
  //   Users.update(req.body)
  //   .then(result => res.json(result))
  //   .catch(error => {
  //     res.status(412).json({ msg: error.message });
  //   });
  // }
};
