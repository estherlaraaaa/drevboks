const File = require('../models/file')
const User = require('../models/user')
const upload = require('express-fileupload')

async function statusFile(req, res) {
	const {id} = req.params
	const file = await File.findById(id)
	file.status = !file.status
	await file.save()
	res.redirect('/dashboard')
}

async function uploadFile(req, res, done) {
	const {id} = req.params
	const user = await User.findById({_id: id})

	if(req.files){
			var file = req.files.fileName,
			fileName = file.name
			var size = 10;
			file.mv("directorios/"+user.username+"/"+fileName,function(err){})
		}

		if((user.available - size) <= 0){
			req.flash('NOuploadFile', 'Ya no tienes espacio.')
			res.redirect('/dashboard')
		}else{
			const newFile = new File()
			newFile.name = fileName
			newFile.username = user.username
			newFile.size = size;
			await newFile.save()
			user.available = user.available - size
			await user.save()
			req.flash('uploadFile', 'Su archivo fue agregado.')
			res.redirect('/dashboard')
		}
	}

module.exports = {
	uploadFile,
	statusFile
}