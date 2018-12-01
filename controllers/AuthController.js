const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const fs = require('fs')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id)
	done(null, user)
})

passport.use('local-signup', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const user = await User.findOne({username: username})
	const email = await User.findOne({email: req.body.email})

	if(user){
		return done(null, false, req.flash('signupMessage', 'El usuario ya esta en uso.'))
	}else if(email){
		return done(null, false, req.flash('signupMessage', 'El email ya esta en uso.'))
	}else{
		const newUser = new User()
		newUser.username = username
		newUser.name = req.body.name
		newUser.lastName = req.body.lastName
		newUser.email = req.body.email
		newUser.password = newUser.encryptPassword(password)
		newUser.gender = req.body.gender
		newUser.avatar = 'default.png'
		newUser.space = 500
		newUser.available = 500
		newUser.type = "admin"
		fs.mkdirSync(`directorios/${username}`)
		await newUser.save()
		done(null, newUser)	
	}	
}))

passport.use('local-signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	
	const user = await User.findOne({username: username})
	if(!user){
		return done(null, false, req.flash('signinMessage', 'No existe este usuario'))
	}
	if(!user.comparePassword(password)){
		return done(null, false, req.flash('signinMessage', 'Clave mala'))
	}
	done(null, user)

}))