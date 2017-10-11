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

router.get('/:id/addemployee', (req, res)=>{
  model.Project.findById(req.params.id)
    .then(dataProject=>{
      model.User.findAll({
        where:{
          role: 'employee'
        }
      })
      .then(dataEmployes =>{
        res.render('addEmployee',
        {
          dataProject:dataProject,
          dataEmployes:dataEmployes
          })
      })
    })
})

router.post('/:id/addemployee',(req, res)=>{
  // console.log(req.params.id,'---------------',req.body.UserId)
   model.User_Project.create(
    {
      ProjectId: req.params.id,
      UserId: req.body.UserId
    })
      .then(()=>{
        res.redirect('/project');
      })
})

router.get('/detail/:id', (req, res)=>{
  // console.log('==============',req.params.id)
  model.Project.findById(req.params.id)
  .then(dataProject=>{
    model.Detail.findAll(
      {
        include:['User']
      }
    )
    .then(detailProject=>{
      // res.render('user_task_detail', 
      //   {
      //     detailProject:detailProject,
      //     dataProject:dataProject
      //   });
      // res.send(detailProject);
      model.User_Project.findAll(
        {
          include:['User']
        })
          .then(dataEmployes=>{
            // res.send(detailProject)
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
  model.Detail.create(
    {
      task: req.body.task,
      status: req.body.status,
      UserId: req.body.UserId
    }).then(()=>{
      var id = req.params.id
      res.redirect(`/project/detail/${id}`)
    })
})
module.exports=router;
