var express= require('express');
var database= require('./database/connect');
var exphbs  = require('express-handlebars');
var auth = require('./routes/auth');
var passport= require('passport');
var passportConfig= require('./config/passport');
var app= express();
var port= process.env.PORT || 5000;

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//home page
app.get('/',(req,res)=>{
       res.send('index');
});

passportConfig(passport);
//routes
auth(app);

database.databaseconnection();

app.listen(port,()=>{
  console.log(`app started at port ${port}`);
})
