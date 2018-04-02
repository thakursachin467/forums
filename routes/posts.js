var posts =require('../models/post');
const {ensureAuthenticated}= require('../helpers/auth');
module.exports = function(app) {

          app.get('/posts',(req,res)=>{
                posts.find({status:'public'})
                .populate('user')
                .then((data)=>{

                    res.render('posts/index',{
                      posts:data
                    });
                });

          });

          app.get('/posts/my',ensureAuthenticated,(req,res)=>{


          });

          app.get('/posts/show',ensureAuthenticated,(req,res)=>{


          });

          app.get('/posts/edit',ensureAuthenticated,(req,res)=>{
                

          });

          app.get('/posts/add',ensureAuthenticated,(req,res)=>{
                res.render('posts/add')

          });

          app.post('/posts',(req,res)=>{
                let allowComments;
                if(req.body.allowcomments){
                  allowComments=true;
                } else {
                  allowComments=false;
                }

                var post = new posts ({
                      title:req.body.title,
                      body:req.body.body,
                      allowComments:allowComments,
                      status:req.body.status ,
                      user:req.user._id
                });

                post.save()
                .then((data)=>{

                  res.redirect(`/posts/show/${data._id}`);
                })

          });
}
