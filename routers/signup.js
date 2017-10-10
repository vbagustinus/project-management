var express = require('express')
var router = express.Router()
let model = require('../models')
const crypto = require('crypto');
// define the home page route

// router.use(function(req,res,next) {
//   if(req.session.hasOwnProperty('username')) {
//     res.redirect('/')
//   } else {
//     next()
//   }
// })

router.get('/', function (req, res) {
  res.render('signup')
})


module.exports = router;
