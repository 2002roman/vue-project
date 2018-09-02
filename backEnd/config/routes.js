var access = require('../app/controllers/access');
var user = require('../app/controllers/user')

module.exports = function (app, passport) {
    app.post('/login',passport.authenticate('local-login', 
    	{
    		failureRedirect: '/login'
    	}),(req,res)=>{
            if(req.user.statusInQuery){
                res.cookie("token",req.user.token)
                res.cookie("typeAccess","local")
                res.send(true)
            }else{
                res.send(req.user.err)
            }
    	}
    )
    app.post('/regin',passport.authenticate('local-signup',
        {
            failureRedirect: '/regin'
        }),(req,res)=>{
            if(req.user.statusInQuery){
                res.cookie("token",req.user.token)
                res.cookie("typeAccess","local")
                res.send(true)
            }else{
                res.send(req.user.err)
            }
        }
    )
    app.get("/verify",(req,res)=>{
        if(req.cookies.token == undefined){
            res.send(false)
        }else res.send(true)
    })
    app.get("/logout",(req,res)=>{
        res.clearCookie('token')
        res.clearCookie('typeAccess')
        res.send(true)
    })
    app.get('/facebook',passport.authenticate('facebook'))
    app.get("/facebook/callback",passport.authenticate('facebook',{failureRedirect: '/faclogin' }),access.facebookC)
    app.get("/userData/:start/",user.getUserImages)
    app.post("/upload",user.upload)
    app.delete("/removeImage/:fileAddress",user.removeImage)
	app.get("/userImage/:fileAddress",user.image)
    app.get("/downloadImage/:fileAddress/:fileName",user.downloadImage)
}
