
var mysql = require('mysql'); 

// var config = {
//     mysql_pool : mysql.createPool({
//     host     :  '127.0.0.1',
//     user     :  'root',
//     password :  '',
//     database :  'ripple',
//     connectTimeout : 20000 ,
//     acquireTimeout : 20000
//   })
// };


var config = {
    host     :  '127.0.0.1',
    user     :  'root',
    password :  '',
    database :  'ripple',
    connectTimeout : 20000 ,
    acquireTimeout : 20000
};



module.exports = {config}