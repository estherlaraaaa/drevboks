const express = require('express')
const shareCTRL = require('../controllers/ShareController')
const router = express.Router()
const Share = require('../models/share')
const User = require('../models/file')

router.get('/share',async (req, res) => {
	const users = await User.find()
	res.render('share', {
		users
	})
})

router.post('/share/:id', shareCTRL.shareFile)
router.get('/deleteShare/:id', shareCTRL.deleteShare)

module.exports = router