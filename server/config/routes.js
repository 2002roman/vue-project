var access = require('../app/controllers/access');
var user = require('../app/controllers/user')

module.exports = function (app, passport) {

    app.get('/facebook',passport.authenticate('facebook'))
    app.get("/facebook/callback",passport.authenticate('facebook',{failureRedirect: '/faclogin' }),access.facebookC)
    app.get("/userData/:start/",user.getUserImages)
    app.post("/upload",user.upload)
    app.delete("/removeImage/:fileAddress",user.removeImage)
    app.post('/login',passport.authenticate('local', 
    	{
    		failureRedirect: '/ko'
    	})/*(req,res)=>{
    		console.log(req.body)
    		res.send(req.body.username)
    	}*/
	)
	app.get('/ok',(req,res)=>{
		res.send("okok")
	})
	app.get('/ko',(req,res)=>{
		res.send("koko")
	})
}
