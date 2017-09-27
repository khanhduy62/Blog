var express = require('express');
var router = express.Router();
var post_md =  require('../models/post')
router.get('/', (req, res)=> {
    let data = post_md.getAllPosts();

    data.then(posts =>{
        let result = {
            posts: posts,
            error: false
        }
    res.render('blog/index', {data: result})
    
    }).catch(error=>{
        let result = {
            error: 'could not get post data'
        }
        res.render('blog/index', {data: result})
        
    })
})

module.exports = router;