var express = require('express')
var router = express.Router()

// router.use(function(req, res, next) {
//   if(req.session.hasOwnProperty('username')){
//     next();
//   } else {
//     res.render('login', { msgError: "Kedua form perlu di isi"})
//   }
// })

// define the home page route
router.get('/', function (req, res) {
  res.render('index')
})

module.exports=router;
