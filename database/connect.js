var databaseurl=require('../config/index');
var mongoose= require('mongoose');


module.exports={
databaseconnection:function(){
mongoose.connect(databaseurl())
.then(()=>{
  console.log('database connected');
})
.catch(()=>{
  console.log('error');
});
}
}
