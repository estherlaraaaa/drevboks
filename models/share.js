const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema;

const ShareSchema = new Schema({
	name: String,
	of: String,
	from: String,
	status: {
		type: Boolean,
		default: true
	}
})

module.exports = mongoose.model('shares',ShareSchema)