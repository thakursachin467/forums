var mongoose= require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var user= require('./user')

ObjectId=schema.Types.ObjectId
//lets create our Schema

var postschema = new schema({
    title: {
      type:String,
      required :true
    },
    status:{
      type:String,
      required:true,
      default:'public'
    },
    allowComments:{
      type: Boolean,
      default:true
    },
    body:{
      type:String,
      required:true
    },
    id:{
      type:String
    },
    comments:[{
      commentbody:{
        type:String,
        required:true
      },
      commentdate:{
        type:Date,
        default:Date.now,
        required:true
      },
      commentuser:{
        type:ObjectId,
        ref:'users'
      }
    }
    ],
    user:{
      type:ObjectId,
      ref:'users'
    },
    date:{
      type:Date,
      default:Date.now,
      required:true
    }

});

postschema.plugin(mongoosePaginate);
var post =mongoose.model('posts',postschema,'posts');
module.exports =post;
