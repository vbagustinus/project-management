var express = require('express')
var router = express.Router()
let model = require('../models')
const crypto = require('crypto');
let randomAlphanumeric =  require('../helper/randomNumber')
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

router.post('/', (req, res)=>{
  let secret = randomAlphanumeric(8);
  // console.log('Kunci==',secret);
  let nakedPassword = req.body.password;
  // console.log(nakedPassword)
  const password = crypto.createHmac('sha256', secret)
                         .update(nakedPassword)
                         .digest('hex');
  model.User.create(
    {
      name: req.body.name,
      username: req.body.username,
      password: password,
      role: req.body.role,
      salt: secret
    }).then(()=>{
      res.redirect('/login')
    })
})


module.exports = router;
