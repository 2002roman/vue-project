var access = require('../models/access');
var bcrypt = require('bcrypt');
var fs = require('fs')

exports.login = (req,res)=>{
    /*bcrypt.genSalt(8808, function(err, salt) {
        bcrypt.hash(req.body[1].model, salt, function(err, hash) {
             access.checkuser(req.body[0].model,hash)
        });
    });*/
    var hash = access.getUserHash(req.body[0].model);
    bcrypt.compare(req.body[1].model,hash, function(err, result) {
        if(result==true){
            res.cookie('typeAccess','local');
            res.send(true);
        }else{
            res.send(false);
        }         
    });
    /*
        query = "SELECT * FROM `userslocal` WHERE username='"+req.body[0].model+"' AND password='"+req.body[1].model+"'"
    con.query(query,(err, result, fields)=>{
        if(result[0]==undefined){
            res.send(false)
        }else{
            uniqueToken = generateUniqueAccessToken(req.body[0].model)
            res.cookie('token',uniqueToken)
            res.cookie('typeAccess',"local")
            var query = "UPDATE `userslocal` SET `accesstoken`='"+uniqueToken+"' WHERE username='"+req.body[0].model+"'"
            con.query(query)
            res.send(true)
        }
    })*/
}

exports.facebookC = (req,res)=>{
    if(req.user) {
        console.log(access.findOrCreate(req.user))
        //fs.mkdirSync("./usersFiles/"+req.user.id+"-files")
        res.cookie('token',req.user.accessToken);
        res.cookie('typeAccess',"facebook");
    }
    res.redirect('http://localhost:8081/user/profile');
}
