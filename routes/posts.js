var posts =require('../models/post');
const {ensureAuthenticated}= require('../helpers/auth');
module.exports = function(app) {

          app.get('/posts',(req,res)=>{
                posts.find({status:'public'})
                .populate('user')
                .sort({date:'desc'})
                .then((data)=>{

                    res.render('posts/index',{
                      posts:data
                    });
                });

          });

          app.get('/posts/user/:id',(req,res)=>{
                posts.find({user:req.params.id})
                .populate('user')
                .then((data)=>{

                    res.render('posts/user',{
                      data:data
                    });
                });
          });

          app.get('/posts/my/:id',ensureAuthenticated,(req,res)=>{

                posts.find({user:req.params.id})
                .populate('user')
                .sort({date:'desc'})
                .then((data)=>{

                  res.render('posts/my',{
                    data:data
                  });
                });

                });



          app.get('/posts/show/:id',(req,res)=>{
                        posts.findOne({_id:req.params.id})
                        .populate('user')
                        .populate('comments.commentuser')
                        .then((data)=>{
                          res.render('posts/show',{
                            data:data
                          });
                        });

          });

          app.get('/posts/edit/:id',ensureAuthenticated,(req,res)=>{

                  posts.findOne({_id:req.params.id})
                  .then((data)=>{
                    if(data.user != req.user.id){
                      res.render('/posts');
                    }else {
                      res.render('posts/edit',{
                        data:data
                      });
                    }

                  });

          });


          app.put('/posts/edit/:id',ensureAuthenticated,(req,res)=>{

                  let allowComment;
                    if(req.body.allowcomments){
                        allowComment=true;
                        } else {
                          allowComment=false;
                        }
                    posts.findOneAndUpdate({_id:req.params.id},{
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

                  posts.findOneAndRemove({_id:req.params.id})
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


          app.post('/posts/comment/:id',(req,res)=>{
                      posts.findOne({_id:req.params.id})
                      .then((data)=>{

                        const newcomment ={

                              commentbody:req.body.commentbody,
                              commentuser:req.user.id
                            }

                          data.comments.unshift(newcomment);
                          data.save()
                          .then((data1)=>{
                                res.redirect(`/posts/show/${data._id}`);
                          });

                     });






          });
}
