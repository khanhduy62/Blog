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

updatePost = (params)=>{
    if(params){
        var deferred = q.defer();

          var query = conn.query('UPDATE posts  SET title = ?, content = ?, author = ?, updated_at = ?  WHERE id = ?', [params.title, params.content, params.author, new Date(), params.id],  (error, results, fields)=> {
            if (error){
                console.log('loi khi insert ',error)
                deferred.reject(new Error(error));
            }else{
                console.log('update ok')
                deferred.resolve(results);
            }
          });
        return deferred.promise;
    }
    console.log('khong thuc hien dc update post')
    return false;
}

deletePost = (post_id)=>{
    if(post_id){
        var deferred = q.defer();

          var query = conn.query('DELETE FROM posts WHERE id = ?', [post_id],  (error, results, fields)=> {
            if (error){
                console.log('loi khi delete ',error)
                deferred.reject(new Error(error));
            }else{
                console.log('delete ok')
                deferred.resolve(results);
            }
          });
        return deferred.promise;
    }
    console.log('khong thuc hien dc update post')
    return false;
}
module.exports = {
    getAllPosts: getAllPosts,
    addPost: addPost,
    getPostById: getPostById,
    updatePost: updatePost,
    deletePost: deletePost,
}