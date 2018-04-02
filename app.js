var express= require('express');
var database= require('./database/connect');
var exphbs  = require('express-handlebars');
var auth = require('./routes/auth');
var index = require('./routes/index');
var posts = require('./routes/posts');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var passport= require('passport');
var passportConfig= require('./config/passport');
var app= express();
var port= process.env.PORT || 5000;


//static files
app.use('/assests',express.static(__dirname +'/public'));

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



//set global var

app.use((req,res,next)=>{
  res.locals.user = req.user ||  null;

  next();
})



passportConfig(passport);
//routes
auth(app);
index(app);
posts(app);

database.databaseconnection();

app.listen(port,()=>{
  console.log(`app started at port ${port}`);
})
