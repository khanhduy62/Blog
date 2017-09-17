var express = require('express');
var router = express.Router();
var user_md = require('../models/user');
var helper = require('../helpers/helper');

router.get('/', (req, res)=> {
    res.json({
        message: 'this is admin page'
    })
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
                    res.redirect('/');
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
    
})
module.exports = router;