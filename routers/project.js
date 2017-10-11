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

router.get('/edit/:id', (req, res)=>{
  // console.log('==============',req.params.id)
  model.Project.findById(req.params.id).then(editProject=>{
    res.render('editProject', {editProject:editProject});
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Project.update(
    {
      name: req.body.name
    }, {
      where: {
        id: req.params.id
      }
    }).then(()=>{
      res.redirect('/project')
    })
})

router.get('/delete/:id', (req, res)=>{
  // console.log(req.params.id)
  model.Project.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(()=>{
      res.redirect('/project');
    })
})

router.get('/detail/:id', (req, res)=>{
  // console.log('==============',req.params.id)
  model.Project.findById(req.params.id).then(dataProject=>{
    model.Detail.findAll().then(detailProject=>{
      model.User.findAll(
        {
          where: {
            role: 'employee'
          }
        }).then(dataEmployes=>{
          // console.log(dataEmployes)
          res.render('user_task_detail', 
          {
            detailProject:detailProject,
            dataProject:dataProject,
            dataEmployes:dataEmployes
          });
        })
    })
  })
})

router.post('/detail/:id', (req, res)=>{
  console.log('Prosses')
})
module.exports=router;
