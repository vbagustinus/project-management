var express = require('express')
var router = express.Router()
let model = require('../models')
let randomAlphanumeric =  require('../helper/randomNumber')
const crypto = require('crypto');


router.use(function(req, res, next) {
  if(req.session.hasOwnProperty('username')){
    next();
  }else {
    res.render('login', { msgError: ""})
  }
})
// define the home page route
router.get('/', function (req, res) {
  model.User.findAll()
    .then(dataUsers=>{
      res.render('user', {dataUsers:dataUsers,session:req.session})
    })
})

router.get('/edit/:id', (req, res)=>{
  model.User.findById(req.params.id).then(editUser=>{
    res.render('editUser', {editUser:editUser,session: req.session});
  })
})

router.post('/edit/:id', (req, res)=>{
    let secret = randomAlphanumeric(8);
    // console.log('Kunci==',secret);
    let nakedPassword = req.body.password;
    // console.log(nakedPassword)
    const password = crypto.createHmac('sha256', secret)
                           .update(nakedPassword)
                           .digest('hex');
  model.User.update(
    {
        name: req.body.name,
        username: req.body.username,
        password: password,
        role: req.body.role,
        salt: secret
    }, {
      where: {
        id: req.params.id
      }
    }).then(()=>{
      res.redirect('/user')
    })
})

router.get('/delete/:id', (req, res)=>{
  model.User.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(()=>{
      res.redirect('/user');
    })
})



module.exports = router;
