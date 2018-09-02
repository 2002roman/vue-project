var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var config = require('../config/setting')
var access = require('../app/controllers/access')

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(id, done) {
        done(null, user);
    });
    passport.use("facebook",new FacebookStrategy(config.facebookCon,(accessToken, refreshToken, profile, done)=>{
            profile.accessToken=accessToken
            return done(null,profile)
        }
    ))
    passport.use('local-login',new LocalStrategy({
        username: '',
        password: ''
    },access.login))
    passport.use('local-signup',new LocalStrategy({
        username: '',
        password: ''
    },access.regin))
};
