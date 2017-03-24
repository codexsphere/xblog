var express = require('express');
var router = express.Router();

var User = require('../controllers/user.js');
var Main = require('../controllers/main.js');



router.get('/', Main.getHomePage);
router.get('/theme', Main.getTheme);


router.post('/users', User.createUser);
router.get('/users', User.getUsers);
router.get('/users/:id', User.getUserById);
router.put('/users', User.updateUser);
router.delete('/users', User.deleteUser);

module.exports = router;
