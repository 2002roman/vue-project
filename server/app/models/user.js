const mysql = require('mysql')
const config = require('../../config/setting')

class user{
	getUserUniqueD(typeAccess,token,callback){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var uniqueDataN = "id"
		if(typeAccess=="local") uniqueDataN = "username" 
		var query = "SELECT "+uniqueDataN+" FROM `users"+typeAccess+"` WHERE accesstoken='"+token+"'"
		con.query(query,function(err,result,fields){
			con.end()
			if(result!==undefined) callback(err,result[0][uniqueDataN],fields)
			else console.log("AccessToken denied...!")
		})
	}
	getUserFiles(uniqueD,start,callback){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "SELECT * FROM `"+uniqueD+"-files` LIMIT "+start+",6"
		con.query(query,function(err,result,fields){
			con.end()
			callback(err,result,fields)
		})
	}
	insertImage(uniqueD,fileName,fileAddress){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query ="INSERT INTO `"+uniqueD+"-files`(`name`, `address`) VALUES ('"+fileName+"','"+fileAddress+"')"
		con.query(query)
		con.end()
	}
	removeImage(uniqueD,fileAddress){
		const con = require('mysql').createConnection(config.mysqlCon)
		con.connect()
		var query = "DELETE FROM `"+uniqueD+"-files` WHERE address='"+fileAddress+"'"
		con.query(query)
		con.end()
	}
}

module.exports = new user()