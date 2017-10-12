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
  res.render('login')
})

router.post('/',(req, res)=>{
  // console.log(model.User);
  if(!req.body.username || !req.body.password){
    res.render('login')
  } else {
      model.User.findOne({ where: {username: req.body.username} })
      .then(dataUser => {
        let secret = dataUser.salt
        let nakedPassword = req.body.password;
        const passwordInput = crypto.createHmac('sha256', secret)
                             .update(nakedPassword)
                             .digest('hex');
        // console.log("---",passwordInput);
        // console.log("=====",dataUser.password);
        if(passwordInput === dataUser.password){
          req.session.username = req.body.username;
          req.session.role = dataUser.role;
          // console.log(req.session.role);
          res.redirect('/')
        } else {
          res.render('login')
        }

      })

    }
})
module.exports = router;
