var express= require('express');
var database= require('./database/connect');
var exphbs  = require('express-handlebars');
var auth = require('./routes/auth');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var passport= require('passport');
var passportConfig= require('./config/passport');
var app= express();
var port= process.env.PORT || 5000;

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//cookie parser middleware
app.use(cookieParser())

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global var

app.use((req,res,next)=>{
  res.locals.user = req.user ||  null;
  next();
})

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
