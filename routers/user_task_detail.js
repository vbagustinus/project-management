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
  model.Detail.findAll()
    .then(dataDetail=>{
      res.render('user_task_detail', {dataDetail:dataDetail})
    }) 
})


router.post('/', (req, res)=>{
  model.Detail.create({
    task: req.body.task,
    status: req.body.status,
    User_SubjectId: req.body.name
  }).then(()=>{
    res.redirect('/user_task_detail')
  })
})

router.get('edit/:id', (req, res)=>{
  model.Detail.findById(req.params.id).then(editDetail=>{
    res.render('editDetail', {editDetail:editDetail});
  })
})

router.post('edit/:id', (req, res)=>{
  model.Detail.update(
    {
      task: req.body.task,
      status: req.body.status,
      User_SubjectId: req.body.name
    }, {
      where: {
        id: req.params.id
      }
    })
})

router.get('delete/:id', (req, res)=>{
  model.Detail.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(()=>{
      res.redirect('/user_task_detail');
    })
})



module.exports = router;
