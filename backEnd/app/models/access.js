const mysql = require('mysql')
const config = require('../../config/setting')

class access{
	getUserHash(username,successCallback,failedCallback){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "SELECT * FROM `userslocal` WHERE username='"+username+"'"
		con.query(query,(err,res,fields)=>{
			if(res[0]!==undefined) return successCallback(res[0].password)
			else failedCallback()
		})
		con.end()
	}
	checkUser(username,callback){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "SELECT * FROM `userslocal` WHERE username='"+username+"'"
		con.query(query,(err,res,fields)=>{
			callback(res[0]!==undefined)
		}) 
		con.end()
	}
	signupUser(username,token,hash,callback){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "INSERT INTO `userslocal`(`username`, `password`, `accesstoken`) VALUES ('"+username+"','"+hash+"','"+token+"')"
		con.query(query)
		con.query("CREATE TABLE `"+username+"-files` (name VARCHAR(255), address VARCHAR(255))")
		con.end()
		callback(token)
	}
	findOrCreate(user,callback){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "SELECT * FROM `usersfacebook` WHERE id='"+user.id+"'"
		con.query(query,(err,result,fields)=>{
			if(result[0]==undefined){
				con.query("INSERT INTO `usersfacebook`(`id`, `displayname`, `accesstoken`) VALUES ('"+user.id+"','"+user.displayName+"','"+user.accessToken+"')")
				con.query("CREATE TABLE `"+user.id+"-files` (name VARCHAR(255), address VARCHAR(255))")
				callback()
				con.end()
			}else{
				con.query("UPDATE `usersfacebook` SET `accesstoken`='"+user.accessToken+"' WHERE id='"+user.id+"'")
				con.end()
			}
		})
	}
	updateAccessToken(username,token){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		con.query("UPDATE `userslocal` SET `accesstoken`='"+token+"' WHERE username='"+username+"'")
		con.end()
	}
}

module.exports = new access()