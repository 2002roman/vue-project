const passport = require('passport')
const fs = require('fs')
const https = require('https')
const config = require('./config/setting.js')
const app = require('express')()

server = https.createServer({
	cert : fs.readFileSync('https/certeficate.pem'),
	key : fs.readFileSync('https/privatekey.pem')
}, app)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session())
app.use(require('morgan')('dev'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({limit : '500mb', extended: false }))
app.use(require('body-parser').json({limit : '500mb'}))
app.use(require('cors')(config.corsCon))
require('./config/passport')(passport)
app.all('*',(req,res,next)=>{
	res.append('Access-Control-Allow-Headers', ['Origin, X-Requested-With, Content-Type, Accept'])
	next()
})

require('./config/routes.js')(app, passport)
app.get("/usersFiles/:id/:fileAddress",(req,res)=>{
        res.sendFile(__dirname+'/usersFiles/'+req.params.id+'-files/'+req.params.fileAddress)
})

app.get('/image',(req,res)=>{
    res.sendFile(__dirname+'/public/img/img.jpg')
})

server.listen(8808,()=>{
	console.log('Server started in port 8808...')
})
