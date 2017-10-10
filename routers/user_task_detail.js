var express = require('express')
var router = express.Router()
let model = require('../models')

// router.use(function(req, res, next) {
//   if(req.session.hasOwnProperty('username')){
//     next();
//   }else {
//     res.render('login', { msgError: ""})
//   }
// })
// define the home page route
router.get('/', function (req, res) {
    res.render('user_task_detail')
})


module.exports = router;
