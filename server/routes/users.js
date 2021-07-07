const 	express = require('express'),
	router = express.Router(),
	UserController = require('../controllers/userController.js'),
	Middleware = require('../middlewares/index.js');

/* GET users listing. */
router.post('/login', UserController.login);
router.post('/register', UserController.create);
router.get('/checkUser', Middleware.authentication, UserController.checkUser);
// router.put('/', Middleware.authentication, UserController.update);
// router.delete('/', Middleware.authentication, UserController.delete);


module.exports = router;
