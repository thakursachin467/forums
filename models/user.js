var mongoose= require('mongoose');
var schema = mongoose.Schema;


//lets create our Schema

var userschema = new schema({
    googleID: {
      type:String,
      required :true
    },
    email:{
      type:String,
      required:true
    },
    firstname:{
      type:String
    },
    lastname:{
      type:String
    },
    image:{
      type:String
    }

});
var user =mongoose.model('users',userschema);

module.exports =user;
