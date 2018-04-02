var express= require('express');
var database= require('./database/connect');
var exphbs  = require('express-handlebars');
var app= express();
var port= process.env.PORT || 5000;

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/',(req,res)=>{
       res.send('index');
});



database.databaseconnection();

app.listen(port,()=>{
  console.log(`app started at port ${port}`);
})
