var express = require('express');
var router = express.Router();

console.log('test');
router.get('/',function(req, res, next){
    res.render('index.html');
})

module.exports = router;
