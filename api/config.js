exports.mysqlCon = {
            'host' : "localhost",
            'user' : "root",
            'password' : "",
            'database' : "project-page"
    };
exports.facebookCon = {
            'clientID' : "2052181424999563",
            'clientSecret' : "4662a73147709bc214ee7af1e7c6e993",
            'callbackURL' : "https://localhost:8808/facebook/callback"
    };
exports.corsCon = {
	'origin':['http://localhost:8081'],
	'methods': ['GET','POST','DELETE'],
    'credentials': true
}