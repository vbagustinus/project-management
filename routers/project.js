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
    name: req.body.name,
    deadline: req.body.deadline
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

router.get('/detail/:id', (req, res)=>{
  // console.log('==============',req.params.id)
  model.Project.findById(req.params.id)
    .then(namaProject=>{
    model.Project_Detail.findAll(
      { include: ['Detail'],
        where:
        {
          ProjectId: req.params.id
        }
      })
          .then(dataProject =>{
            model.User.findAll(
              {
                where: {
                  role: 'employee'
                }
              }).then(dataEmployes=>{
                        // res.send(dataUser)
             res.render('user_task_detail', 
             {
               dataProject:dataProject,
               dataEmployes:dataEmployes,
               namaProject:namaProject
               })
              })
      })
  })
})
 
router.post('/detail/:idProject/add', (req, res)=>{
  // res.send(req.body.id)
  model.Detail.create(
    {
      task: req.body.task,
      status: req.body.status,
      UserId: req.body.UserId
    }).then((dataDetail)=>{
      // console.log('=============',dataDetail)
      model.Project_Detail.create(
        {
          DetailId: dataDetail.id,
          ProjectId: req.params.idProject
        })
          .then(()=>{
            var id = req.params.idProject
            res.redirect(`/project/detail/${id}`)
          })
    })
})

router.get('/detail/:idProject/edit/:idDetail',(req, res)=>{
  model.Detail.findById(req.params.idDetail)
    .then(editDetail=>{
      model.User.findAll({
        where:{
          role: 'employee'
        }
      })
      .then(dataEmployes =>{
        model.Project.findById(req.params.idProject)
        .then(dataProject=>{
          res.render('editDetail',
          {
            editDetail:editDetail,
            dataEmployes:dataEmployes,
            dataProject:dataProject
          })
        })
      })
    })
})

router.post('/detail/:idProject/edit/:idDetail', (req, res)=>{
  model.Detail.update(
    {
      task: req.body.task,
      status: req.body.status,
      UserId: req.body.UserId
    },{
      where:{
        id: req.params.idDetail
      }
    }).then(()=>{
      var id = req.params.idProject
      res.redirect(`/project/detail/${id}`)
    })
})

router.get('/detail/:idProject/delete/:idDetail', (req, res)=>{
  model.Detail.destroy(
    {
      where:{
        id: req.params.idDetail
      }
    }).then(()=>{
      var id = req.params.idProject
      res.redirect(`/project/detail/${id}`)
    })
})

module.exports=router;
