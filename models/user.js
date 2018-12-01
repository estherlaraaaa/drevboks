const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: String,
	name: String,
	lastName: String,
	email: String,
	password: String,
	gender: String,
	avatar: String,
	space: Number,
	available: Number,
	type: String
})

UserSchema.methods.encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function (password){
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users',UserSchema)