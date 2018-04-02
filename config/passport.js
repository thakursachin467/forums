var googleStrategy = require('passport-google-oauth20').Strategy;
var mongoose =require('mongoose');
var keys =require('./keys');


module.exports = function(passport) {
              passport.use(
                new googleStrategy({
                  clientID:     keys.googleClientID,
                  clientSecret: keys.googleClientSecret,
                  callbackURL: "http://localhost:5000/oauth/google/callback",
                  proxy:true
                },(accessToken,refressToken,profile,done)=>{
                  console.log(accessToken);
                  console.log(profile);
                })
              )
}
