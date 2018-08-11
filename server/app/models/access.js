const mysql = require('mysql')
const config = require('../../config/setting')

class access{
	getUserHash(username){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "SELECT * FROM `userslocal` WHERE username='"+username+"'"
		con.query(query,(err,res,fields)=>{if(res[0]!==undefined) return res[0].password})
		con.end()
	}
	findOrCreate(user){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "SELECT * FROM `usersfacebook` WHERE id='"+user.id+"'"
		con.query(query,(err,result,fields)=>{
			if(result[0]==undefined){
				console.log(user)
				con.query("INSERT INTO `usersfacebook`(`id`, `displayname`, `accesstoken`) VALUES ('"+user.id+"','"+user.displayName+"','"+user.accessToken+"')")
				con.query("CREATE TABLE `"+user.id+"-files` (name VARCHAR(255), address VARCHAR(255))")
				con.end()
				return true
			}else{
				con.query("UPDATE `usersfacebook` SET `accesstoken`='"+user.accessToken+"' WHERE id='"+user.id+"'")
				con.end()
				return false
			}
		})
	}
}

module.exports = new access()