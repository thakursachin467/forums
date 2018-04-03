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

          app.get('/posts/show/:id',(req,res)=>{
                        posts.findOne({_id:req.params.id})
                        .populate('user')
                        .then((data)=>{
                          res.render('posts/show',{
                            data:data
                          });
                        });

          });

          app.get('/posts/edit/:id',ensureAuthenticated,(req,res)=>{
                  posts.findOne({_id:req.params.id})
                  .then((data)=>{
                    res.render('posts/edit',{
                      data:data
                    })
                  });

          });


          app.put('/posts/edit/:id',ensureAuthenticated,(req,res)=>{
                  let allowComment;
                    if(req.body.allowcomments){
                        allowComment=true;
                        } else {
                          allowComment=false;
                        }
                    posts.findOneAndUpdate(req.params.id,{
                    title:req.body.title,
                    allowComments:allowComment,
                    status:req.body.status,
                    body:req.body.body,
                    user:req.user._id
                  })
                  .then((data)=>{
                      res.redirect('/posts');
                  });

          });


          app.delete('/posts/:id',ensureAuthenticated, (req,res)=>{
                  posts.findOneAndRemove(req.params.id)
                  .then(()=>{
                      res.redirect('/dashboard');
                  });
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
