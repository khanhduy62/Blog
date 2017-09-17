var mysql = require('mysql');
var config_mysql = require('../../config/config');

var conn = mysql.createConnection({
    host    : config_mysql.mysql.host,
    user    : config_mysql.mysql.user,
    password: config_mysql.mysql.password,
    database: config_mysql.mysql.database
});

//kết nối.
conn.connect(function (err){
    //nếu có nỗi thì in ra
    if (err) throw err.stack;
    //nếu thành công
    console.log('ket noi thanh cong');
    
});

function getConnection(){
    if(!conn){
        conn.connect();
    }
    return conn;
}

module.exports = {
    getConnection : getConnection()
}