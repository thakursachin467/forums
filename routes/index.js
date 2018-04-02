const {ensureAuthenticated,ensureGuest}= require('../helpers/auth');

module.exports = function(app){
  //home page
  app.get('/',ensureGuest,(req,res)=>{
         res.render('index/welcome')
  });

  app.get('/dashboard',ensureAuthenticated,(req,res)=>{
         res.render('index/dashboard');
  });



}
