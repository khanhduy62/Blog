var express = require('express');
var router = express.Router();

router.use('/admin', require(__dirname + '/admin.js'));
router.use('/blog', require(__dirname + '/blog.js'));

router.get('/', (req, res, next)=>{
    console.log('the response will be sent by the next function ...')
    next()
}, (req, res)=>{
    res.render('test')    
})

router.get('/chat', (req, res) => {
    res.render('chat');
})
module.exports = router;