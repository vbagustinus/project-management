var express = require('express')
var router = express.Router()
let model = require('../models')
let scoreLetter =  require('../helper/scoreLetter')

// router.use(function(req, res, next) {
//   if(req.session.hasOwnProperty('username')){
//     next();
//   }else {
//     res.render('login', { msgError: ""})
//   }
// })
// define the home page route
router.get('/', function (req, res) {
  model.Subject.findAll().then(()=>{
    res.render('user_task_detail')
  })
})


module.exports = router;
