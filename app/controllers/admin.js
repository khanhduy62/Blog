var express = require('express');
var router = express.Router();
var user_md = require('../models/user');
var post_md = require('../models/post');
var helper = require('../helpers/helper');

router.get('/', (req, res)=> {
    console.log('session ',req.session.session_user )
    if(req.session.session_user){
        console.log('da co session')
        var data = post_md.getAllPosts();
        data.then((posts)=>{
            var data = {
                posts: posts,
                error: false
            }
            res.render('admin/dashboard',{data: data})
    
        }).catch((error)=>{
            res.render('admin/dashboard',{data: {error: 'Get Posts Data is Error !!!'}})
        })
    }else{
        console.log('chua co session')
        res.redirect('/admin/signin')
    }
    
    
})

router.get('/signup', (req, res)=> {
    res.render('signup', {
        data: {}
    })
})

router.get('/signin', (req, res)=> {
    res.render('signin', {
        data: {}
    })
})
router.post('/signup', (req, res, next)=> {
    var user = req.body;
    if(user.email.trim(). length == 0){
        res.render('signup', {
            data: {
                error: 'Email is required'
            }
        })
        console.log("da bi loi k co email")
        return;
    }
    if(user.passwd != user.repasswd ){
        res.render('signup', {
            data: {
                error: 'Password is not matched'
            }
        })
        return;
    }

    if(user.passwd.trim().length == 0 || user.repasswd.trim().length == 0 ){
        res.render('signup', {
            data: {
                error: 'Please enter password'
            }
        })
        return;
    }


    var passwd = helper.hash_passwd(user.passwd);
    console.log("passwd khi hash ", passwd);
    // insert to db
    user = {
        email: user.email,
        password: passwd,
        first_name: user.firstname,
        last_name: user.lastname
    }

    let result = user_md.addUser(user);

    result.then((data)=>{
        res.redirect('signin');      
    }).catch((error)=>{
        res.render('signup', {
            data: {
                error: 'Could not insert data into DB'
            }
        })
    })
    
})

router.post('/signin', (req, res)=> {
    var params = req.body;
    
    if(params.email.trim().length == 0){
        res.render('signin',{
            data: {
                error: 'Please enter your email'
            }
        })
    }else{
        var data = user_md.getUserByEmail(params.email);
            
        data.then((users)=>{
            var user = users[0];

                var status = helper.compare_passwd(params.password, user.password);
                console.log('status ',status);
                if(status){
                    req.session.session_user = user;
                    console.log('Session la: ',req.session.session_user)
                    res.redirect('/admin');
                }else{
                    res.render('signin',{
                        data: {
                            error: "Password's wrong"
                        }
                    })
                }
        }).catch((error)=>{
                res.render('signin',{
                    data:{
                        error: "User doesn't esists. Please enter again !!"
                    }
                })
        });
    }
    
});

router.get('/post/new', (req,res)=>{
    if(req.session.session_user){
        res.render('admin/post/new',{data:{error:false}});      
    }else{
        res.redirect('/admin/signin') 
    }
})

router.post('/post/new', (req,res)=>{
    var params = req.body;
    console.log('params ', params)
    
    var now = new Date();
    params.created_at = now;
    params.updated_at = now;

    var data = post_md.addPost(params);
    data.then(result=>{
        res.redirect('/admin')
    }).catch(err=>{
        res.render('admin/post/new',{
            data:{
                error: 'could not insert post'
            }
        })
    })
})

router.get('/post/edit/:id', (req, res)=>{
    if(req.session.session_user){
        let params = req.params;
        let id = params.id;
    
        let data = post_md.getPostById(id);
    
        data.then((posts)=>{
            let post = posts[0];
            var data = {
                post: post,
                error: false
            }
            res.render('admin/post/edit', {data: data});
        }).catch((error)=>{
            res.render('admin/post/edit',{data: {error: 'could not get post by ID '}});
        })
    }else{
        res.redirect('/admin/singin') 
    }
    
})

router.put('/post/edit', (req, res)=>{
    let params = req.body

    let data = post_md.updatePost(params)

    
        data.then(result=>{
            res.json({
                status_code: 200
            })
        }).catch(error=>{
            res.json({
                status_code: 500
            })
        })
})

router.delete('/post/delete', (req, res)=>{
    let post_id = req.body.id

    let data = post_md.deletePost(post_id)

    
        data.then(result=>{
            res.json({
                status_code: 200
            })
        }).catch(error=>{
            res.json({
                status_code: 500
            })
        })
})

router.get('/user', (req, res)=>{
    if(req.session.session_user){
        let data = user_md.getAllUsers();
        
            data.then(users=>{
                let data = {
                    users: users,
                    error: false
                }
                res.render('admin/user', {data: data})
            }).catch(err=>{
                let data = {
                    error: 'could not get all usets'
                }
                res.render('admin/user', {data: data})
            })
    }else{
        res.redirect('/admin/signin') 
    }
    
})
module.exports = router;