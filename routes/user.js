const express = require('express')
const userCTRL = require('../controllers/UserController')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/settings/:id', isAuthenticated, userCTRL.settings)
router.get('/password/:id', isAuthenticated, userCTRL.password)
router.get('/', userCTRL.findAll);
router.delete('/:id',userCTRL.deleteUser);
router.post('/settings/:id', userCTRL.updateUser)
router.post('/password/:id', userCTRL.updatePassword)

function isAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/')}

module.exports = router