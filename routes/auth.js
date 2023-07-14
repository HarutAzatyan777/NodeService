const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/Auth');


router.post('/signup', AuthController.postSignup);
router.get('/verify-email', AuthController.verifyEmail);
router.post('/signin', AuthController.postSignIn);
router.get('/google',  passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
