const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema;

const FileSchema = new Schema({
	name: String,
	username: String,
	status: {
		type: Boolean,
		default: true
	},
	size: Number
})

module.exports = mongoose.model('files',FileSchema)