const Share = require('../models/share')
const User = require('../models/user')
const File = require('../models/file')
const upload = require('express-fileupload')

async function shareFile(req, res) {
	const {id} = req.params
	const fileName = req.params
	const user = await User.findById({_id: id})

	const newShare = new Share()
	newShare.name = req.body.shareFile
	newShare.of = user.username
	newShare.from = req.body.userShare
	req.flash('shareFile', 'Su archivo fue compartido con ' + req.body.userShare)
	newShare.save()
	res.redirect('/dashboard')
}

async function deleteShare(req, res) {
	const {id} = req.params
	await Share.remove({_id: id})
	res.redirect('/shares')
}

module.exports = {
	shareFile,
	deleteShare
}