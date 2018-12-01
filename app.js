const path = require('path')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const upload = require('express-fileupload')

const app = express()

// Connecting to DB
mongoose.connect('mongodb://proyecto:proyecto123@ds239940.mlab.com:39940/proyecto')
	.then(db => console.log('DB connected'))
	.catch(err => console.log(err))

// importing routes
const indexRoutes = require('./routes/index')
require('./controllers/AuthController')
const userRoutes = require('./routes/user')
require('./controllers/UserController')
const fileRoutes = require('./routes/file')
require('./controllers/FileController')
const shareRoutes = require('./routes/share')
require('./controllers/ShareController')

// settings
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/directorios')));

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(session({
	secret: 'estherbrendadanielerik',
	resave: false,
	saveUninitialized: false
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	app.locals.signinMessage = req.flash('signinMessage');
  	app.locals.signupMessage = req.flash('signupMessage');
  	app.locals.uploadFile = req.flash('uploadFile');
  	app.locals.NOuploadFile = req.flash('NOuploadFile');
  	app.locals.shareFile = req.flash('shareFile');
	app.locals.user = req.user
	next()
})

app.use(upload())

// routes
app.use('/', indexRoutes)
app.use('/users', userRoutes)
app.use('/files', fileRoutes)
app.use('/shares', shareRoutes)
// server
app.listen(app.get('port'), () => {
	console.log(`Server on ${app.get('port')}`)
})