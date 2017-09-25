var db = require('../common/database');
var conn = db.getConnection;
var q = require('q');
addUser = (user)=>{
    if(user){
        var deferred = q.defer();
       

          var query = conn.query('INSERT INTO users SET ?', user,  (error, results, fields)=> {
            if (error){
                console.log('loi khi insert ',error)
                deferred.reject(new Error(error));
            }else{
                deferred.resolve(results);
            }
          });
        return deferred.promise;
    }
    return false;
}

getUserByEmail = (email)=>{
    if(email){
        var deferred = q.defer();

        var query = conn.query('SELECT * FROM `users` WHERE  `email` = ?',[email],  (error, results, fields)=> {
            if(error){
                console.log("Co loi getUserByEmail");
                deferred.reject(new Error(error));
            }else{
                console.log('thanh cong getUserByEmail')
                deferred.resolve(results);
            }
        });
        return deferred.promise;
    }
    return false;
}

getAllUsers = ()=>{
    var deferred = q.defer();
    
            var query = conn.query('SELECT * FROM users ',  (error, results, fields)=> {
                if(error){
                    console.log("Co loi get all users");
                    deferred.reject(new Error(error));
                }else{
                    console.log('thanh cong getAllUsers')
                    deferred.resolve(results);
                }
            });
    return deferred.promise;
}
module.exports = {
    addUser : addUser,
    getUserByEmail : getUserByEmail,
    getAllUsers: getAllUsers,
}