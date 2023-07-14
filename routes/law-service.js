const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const LawService = require('../controllers/LawService');


router.post('/', LawService.create );


router.put('/:id',  LawService.update);


router.get('/:id', LawService.getById );


router.get('/', LawService.getAll );


router.delete('/:id',LawService.delete);

module.exports = router;
