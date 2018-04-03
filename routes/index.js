const {ensureAuthenticated,ensureGuest}= require('../helpers/auth');
var posts =require('../models/post');

module.exports = function(app){
  //home page
  app.get('/',ensureGuest,(req,res)=>{
         res.render('index/welcome')
  });

  app.get('/dashboard',ensureAuthenticated,(req,res)=>{
          posts.find({user:req.user.id})
          .then((data)=>{
                 res.render('index/dashboard',{
                   data:data
                 });
                
          })

  });



}
