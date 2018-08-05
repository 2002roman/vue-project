const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const fs = require("fs")
const https = require("https")
const path = require("path")
const mime = require("mime")
const uuidv1 = require('uuid/v1')
const config = require("./config.js")
const con = require("mysql").createConnection(config.mysqlCon)
const app = require("express")()

server = https.createServer({
	cert : fs.readFileSync('https/certeficate.pem'),
	key : fs.readFileSync('https/privatekey.pem')
}, app)
con.connect()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.session({secret:"okokok"}));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({limit : '500mb', extended: false }));
app.use(require('body-parser').json({limit : '500mb'}))
app.use(require('cors')(config.corsCon));

function decodeBase64Image(dataString) {
	if(dataString){
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
		var response = {}
	
		if (matches.length !== 3) {
			return new Error('Invalid input string')
		}
	
		response.type = matches[1]
		response.data = new Buffer(matches[2], 'base64')
	
		return response
	}
}

function parseCookie(cookies,name){
	var pair = cookies.match(new RegExp(name + '=([^;]+)'));
	return !!pair ? pair[1] : null;
}

function getUserID(typeAccess,token,callback){
	query = "SELECT id FROM `users"+typeAccess+"` WHERE accesstoken='"+token+"'"
	con.query(query,function(err,result,fields){
		callback(err,result[0].id,fields)
	})
}

function getUserFiles(id,callback){
	query = "SELECT * FROM `"+id+"-files`"
	con.query(query,function(err,result,fields){
		callback(err,result,fields)
	})
}

function saveFileInDB(id,fileName,fileAddress){
	query ="INSERT INTO `"+id+"-files`(`name`, `address`) VALUES ('"+fileName+"','"+fileAddress+"')"
	con.query(query)
}

function findOrCreate(user){
	query = "SELECT * FROM `usersfacebook` WHERE id='"+user.id+"'"
	con.query(query,function(err,result,fields){
		if(result[0]==undefined){
			con.query("INSERT INTO `usersfacebook`(`id`, `displayname`, `accesstoken`) VALUES ('"+user.id+"','"+user.displayName+"','"+user.accessToken+"')")
			con.query("CREATE TABLE `"+user.id+"-files` (name VARCHAR(255), address VARCHAR(255))")
			fs.mkdirSync("./usersFiles/"+user.id+"-files")
		}else{
			con.query("UPDATE `usersfacebook` SET `accesstoken`='"+user.accessToken+"' WHERE id='"+user.id+"'")
		}
	})
}


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new FacebookStrategy(config.facebookCon,  function(accessToken, refreshToken, profile, done) {
		profile.accessToken=accessToken
		return done(null,profile)
	}
))


app.all('*', function (req,res,next) {
	res.append('Access-Control-Allow-Headers', ['Origin, X-Requested-With, Content-Type, Accept'])
	next()
})

app.get('/image',function(req,res){
	res.sendFile(__dirname+'/img/img.jpg')
})

app.get('/font',function(req,res){
	res.sendFile(__dirname+'/Monoton-Regular.ttf')
})

app.post('/login',function(req,res){
	res.setHeader('Content-Type', 'text/plain')
	query = "SELECT * FROM `userslocal` WHERE username='"+req.body[0].model+"' AND password='"+req.body[1].model+"'"
	con.query(query, function (err, result, fields) {
		if(result[0]==undefined){
			res.send(false)
		}else{
			res.cookie('token',"localAccessToken")
			res.cookie('typeAccess',"local")
			res.send(true)
		}
	})
})

app.post('/regin',function(req,res){
	con.query("SELECT * FROM `userslocal` WHERE username='"+req.body[0].model+"'",function(err,res){
		if(res[0]==undefined){
			query = "INSERT INTO `userslocal` (username,password,displayname) VALUES ("+req.body[0].model+","+req.body[1].model+","+req.body[2].model+")"
			con.query(query, function (err, result, fields) {
				res.send(true)
			})
		}else res.send(false)
	})
})

app.get('/facebook',passport.authenticate('facebook'))

app.get("/facebook/callback",passport.authenticate('facebook',{failureRedirect: '/faclogin' }),function(req,res){
	if(req.user) {
		findOrCreate(req.user)
		res.cookie('token',req.user.accessToken)
		res.cookie('typeAccess',"facebook")
	}
	res.redirect('http://localhost:8081/user/profile');
})

app.get("/userData",function(req,res){
	getUserID(req.cookies.typeAccess,req.cookies.token,function(err,id,fields){
		getUserFiles(id,function(err,result,fields){
			res.send({result,id})
		})
	})
})

app.get("/usersFiles/:id/:fileAddress",function(req,res){
	res.sendFile(__dirname+'/usersFiles/'+req.params.id+'-files/'+req.params.fileAddress)
})

app.post("/upload",function(req,res){
	getUserID(parseCookie(req.body.cookies,"typeAccess"),parseCookie(req.body.cookies,"token"),function(err,id,fields){
		for(file of req.body.files){
			if(file.fileAddress){
				var decodedImg = decodeBase64Image(file.fileAddress)
				var imageBuffer = decodedImg.data
				var type = decodedImg.type
				var extension = mime.getExtension(type)
				var fileName =  uuidv1()+"." + extension
				saveFileInDB(id,file.fileName,fileName)
				fs.writeFileSync("usersFiles/"+id+"-files/"+fileName, imageBuffer, 'utf8')
			}
		}
		res.send(true)
	})
})

server.listen(8808, function() {
  console.log('Server started..!');
})