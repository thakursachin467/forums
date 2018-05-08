var googleStrategy = require('passport-google-oauth20').Strategy;
var mongoose =require('mongoose');
var user =require('../models/user');
var keys =require('./keys');


module.exports = function(passport) {
              passport.use(
                new googleStrategy({
                  clientID:     keys.googleClientID,
                  clientSecret: keys.googleClientSecret,
                  callbackURL: "/oauth/google/callback",
                  proxy:true
                },(accessToken,refressToken,profile,done)=>{
                  //console.log(accessToken);


                  var image = profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));
                  var newuser = user({
                    googleID:profile.id,
                    firstname:profile.name.givenName,
                    lastname:profile.name.familyName,
                    email:profile.emails[0].value,
                    image:image
                  });
                  //check for exesting users
                  user.findOne({googleID:profile.id })
                  .then((data)=>{
                    if(data){
                      done(null,data);
                    }
                    else{
                          //ctreate user
                          newuser.save()
                          .then((data)=>{
                            done(null,data);
                          })
                    }
                  })
                })
              );
//serialize and deserializeUser
          passport.serializeUser(function(data, done) {
                done(null, data.id);
});

passport.deserializeUser(function(id, done) {
user.findById(id, function(err, data) {
          done(err, data);
});
});
}
