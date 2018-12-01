const User = require('../models/user')
const upload = require('express-fileupload')

async function settings(req, res, next){
	const users = await User.find()
	res.render('settings', {
		users
	})
}

async function password(req, res, next){
	const users = await User.find()
	res.render('password', {
		users
	})
}

async function findAll(req, res, next) {
    let users = await User.find();
    return res.status(200).json(users);
}

async function deleteUser(req, res, next) {
    let { id } = req.params;
    await User.remove({ _id: id });
    res.status(200).json({ "message": "Usuario Eliminado con exito" });
}

async function updateUser(req, res) {
	const {id} = req.params
	await User.update({_id: id}, req.body)
	const user = await User.findById({_id: id})
	if(req.files){
		var file = req.files.imgName,
		imgName = file.name
		file.mv("public/profile-img/"+imgName,function(err){
			if(err){
				console.log(err)
				res.send("Error al subir foto de perfil")
			}
		})
	}
	res.redirect('/dashboard')
}
		
async function updatePassword(req, res) {
	const {id} = req.params
	const user = await User.findById(id)
	const updateUser = User();
	if(req.body.password != req.body.Vpassword){
		res.redirect('/password')
	}else{

	user.password = updateUser.encryptPassword(req.body.password)
	await user.save()
	res.redirect('/dashboard')
	}
}

module.exports = {
	settings,
	password,
	deleteUser,
	findAll,
	updateUser,
	updatePassword
	}