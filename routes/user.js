const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/User');
const jwtAuth = passport.authenticate('jwt', { session: false });


router.post('/service', UserController.saveService);
router.get('/service/:serviceId', UserController.getService);

module.exports = router;
