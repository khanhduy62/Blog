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

addPost = (params)=>{
    if(params){
        var deferred = q.defer();
       

          var query = conn.query('INSERT INTO posts  SET ?', params,  (error, results, fields)=> {
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

getPostById = (id)=>{
    if(id){
        var deferred = q.defer();
        
    
        var query = conn.query('Select * from posts where `id` = ? ',[id] , (error, results, fields)=> {
            if (error){
                console.log('loi khi select ',error)
                deferred.reject(new Error(error));
            }else{
                deferred.resolve(results);
            }
        });
        return deferred.promise;
    }
    return false;
    
}
module.exports = {
    getAllPosts: getAllPosts,
    addPost: addPost,
    getPostById: getPostById,
}