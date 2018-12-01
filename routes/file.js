const express = require('express')
const fileCTRL = require('../controllers/FileController')
const router = express.Router()
const File = require('../models/file')

router.post('/upload/:id', fileCTRL.uploadFile)
router.get('/statusFile/:id', fileCTRL.statusFile)

module.exports = router