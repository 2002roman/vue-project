const passport = require('passport')
const fs = require('fs')
const https = require('https')
const config = require('./config/setting.js')
const app = require('express')()

server = https.createServer({
	cert : fs.readFileSync('config/https/certeficate.pem'),
	key : fs.readFileSync('config/https/privatekey.pem')
}, app)
require('./config/passport')(passport)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session())
app.use(require('morgan')('dev'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({limit : '500mb', extended: false }))
app.use(require('body-parser').json({limit : '500mb'}))
app.use(require('cors')(config.corsCon))
app.all('*',(req,res,next)=>{
	res.append('Access-Control-Allow-Headers', ['Origin, X-Requested-With, Content-Type, Accept'])
	next()
})

require('./config/routes.js')(app, passport)

app.get('/public/:folderN/:fileN',(req,res)=>{
    res.sendFile(__dirname+'/public/'+req.params.folderN+'/'+req.params.fileN)
})

server.listen(8808,()=>{
	console.log('Server started in port 8808...')
})
