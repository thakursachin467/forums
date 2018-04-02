var passport= require('passport');




module.exports = function(app) {

      app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));


      app.get( '/oauth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard ',
        failureRedirect: '/'
}));

app.get('/logout',(req,res)=>{
      req.logout();
    //  req.flash('success_msg','you are logout');
      res.redirect('/login');

});

}
