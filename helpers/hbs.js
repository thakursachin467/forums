var moment= require('moment');
module.exports={
  truncate :function(str,len){
    if (str.length > len && str.length > 0) {
  			var new_str = str + " ";
  			new_str = str.substr(0, len);
  			new_str = str.substr(0, new_str.lastIndexOf(" "));
  			new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
  			return new_str + '...';
  		}
  		return str;
    },
    striptag: function(input){
      return input.replace(/<(?:.|\n)*?>/gm, ' ');

    },
    formatdate:function(date,format) {
          var stillUtc = moment.utc(date).toDate();
          var local = moment(stillUtc).local().format(format);
          //return moment(date).format(format);
          return local;
    }
}
