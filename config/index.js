var configvalue = require('./config');

module.exports = function databaseurl(){
        return "mongodb://"+configvalue.duser + ":" + configvalue.dpassword + "@ds231549.mlab.com:31549/forums";
}
