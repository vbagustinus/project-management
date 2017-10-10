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
  model.Project.findAll()
    .then(dataProjects =>{
      res.render('project', {dataProjects:dataProjects})
    })
})

router.get('/add', (req, res)=>{
  res.render('addProject')
})

router.post('/add', (req, res)=>{
  model.Project.create({
    name: req.body.name
  }).then(()=>{
    res.redirect('/project')
  })
})

router.get('edit/:id', (req, res)=>{
  model.Project.findById(req.params.id).then(editProject=>{
    res.render('editProject', {editProject:editProject});
  })
})

router.post('edit/:id', (req, res)=>{
  model.Project.update(
    {
      name: req.body.name
    }, {
      where: {
        id: req.params.id
      }
    })
})

router.get('delete/:id', (res, req)=>{
  model.Project.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(()=>{
      res.redirect('/projects');
    })
})

module.exports=router;
