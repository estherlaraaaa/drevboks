const express = require('express')
const router = express.Router()
const User = require('../models/user')
const File = require('../models/file')
const Share = require('../models/share')
const passport = require('passport')

router.get('/', async (req, res) => {
	const users = await User.find()
	res.render('index', {
		users
	})
})

router.post('/register', passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/',
	failureFlash: true
}))

router.post('/login', passport.authenticate('local-signin', {
	successRedirect: '/dashboard',
	failureRedirect: '/',
	failureFlash: true
}))

router.get('/logout', (req, res, next) => {
	req.logout()
	res.redirect('/')
})

router.get('/dashboard', isAuthenticated,async (req, res) => {
	const files = await File.find()
	const users = await User.find()
	res.render('dashboard', {
		files
	})
})

router.get('/admin',async (req, res) => {
	const users = await User.find()
	res.render('admin', {
		users
	})
})

router.get('/trash', isAuthenticated,async (req, res) => {
	const files = await File.find()
	res.render('trash', {
		files
	})
})

router.get('/shares', isAuthenticated,async (req, res) => {
	const shares = await Share.find()
	res.render('shares', {
		shares
	})
})

function isAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/')
}

module.exports = router