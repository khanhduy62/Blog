var db = require('../common/database');
var conn = db.getConnection;
var q = require('q');

getAllPosts = ()=>{
    var deferred = q.defer();
    

    var query = conn.query('Select * from posts',  (error, results, fields)=> {
        if (error){
            console.log('loi khi select ',error)
            deferred.reject(new Error(error));
        }else{
            deferred.resolve(results);
        }
    });
    return deferred.promise;
}

module.exports = {
    getAllPosts: getAllPosts
}