var express = require('express')
var router = express.Router()
let model = require('../models')

router.use(function(req, res, next) {
  if(req.session.hasOwnProperty('username')){
    next();
  }else {
    res.render('login', { msgError: ""})
  }
})
// define the home page route
router.get('/', function (req, res) {
  model.Project.findAll()
    .then(dataProjects =>{
      res.render('project', {dataProjects:dataProjects,session:req.session})
    })
})

router.get('/add', (req, res)=>{
  res.render('addProject')
})

router.post('/add', (req, res)=>{
  model.Project.create({
    name: req.body.name,
    deadline: req.body.deadline
  }).then(()=>{
    res.redirect('/project',{session:req.session})
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
      name: req.body.name,
      deadline: req.body.deadline
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

router.get('/task/:id',(req, res)=>{
  model.Detail.findAll()
  .then(dataTask=>{
    model.Project.findById(req.params.id)
      .then((dataProject)=>{
        dataProject.getDetails()
        .then((details) => {

             res.render('assignTask', {
             dataProject:dataProject,
             dataTask:dataTask,
             dataProjectDetails: details
            })
          })
      })
  })
})

router.post('/task/:id', (req, res)=>{
  model.Project_Detail.create(
    {
      ProjectId: req.params.id,
      DetailId: req.body.DetailId
    })
      .then(()=>{
        res.redirect(`/project/task/${req.params.id}`)
      })
})

// router.get('/:id/addemployee', (req, res)=>{
//   model.Project.findById(req.params.id)
//     .then(dataProject=>{
//       model.User.findAll({
//         where:{
//           role: 'employee'
//         }
//       })
//       .then(dataEmployes =>{
//         res.render('addEmployee',
//         {
//           dataProject:dataProject,
//           dataEmployes:dataEmployes
//           })
//       })
//     })
// })

// router.post('/:id/addemployee',(req, res)=>{
//   // console.log(req.params.id,'---------------',req.body.UserId)
//    model.User_Project.create(
//     {
//       ProjectId: req.params.id,
//       UserId: req.body.UserId
//     })
//       .then(()=>{
//         res.redirect('/project');
//       })
// })

// router.get('/detail/:id', (req, res)=>{
//   // console.log('==============',req.params.id)
//   model.Project.findById(req.params.id)
//   .then(namaProject=>{
//     model.Project_Detail.findAll({
//       include: ['Detail'],
//       where: {
//         ProjectId: req.params.id
//       }
//     })
//     .then(dataProject =>{
//       model.User.findAll({
//         where: {
//           role: 'employee'
//         }
//       })
//       .then(dataEmployes=>{
//         // res.send(dataEmployes)
//         res.render('user_task_detail', {
//           dataProject:dataProject,
//           dataEmployes:dataEmployes,
//           namaProject:namaProject
//       })
//     })
//   })
//   })
// })

//

module.exports=router;
