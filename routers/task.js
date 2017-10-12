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

router.get('/', (req, res)=>{

    // model.User.findAll(
    //   {
    //     where:{
    //       role: 'employee'
    //     }
    //   })
    // .then(function(users) {
    //   model.Detail.findAll()
    //     .then((details)=>{
    //       res.render('task', {
    //         dataUsers:users,
    //         dataDetails:details
    //         //  dataProject: project,
    //         //  dataProjectDetails: details
    //       })
    //     })

        model.Detail.findAll({
          include: [model.User]
        }).then(function(details){
          model.User.findAll().then(function(user){
            res.render('task', {
              dataDetails:details,
              dataUsers:user,
              session: req.session
            })
          })
        })

      // model.Project.findById(req.params.id)
      // .then(project => {
      //   project.getDetails()
      //   .then((details) => {

      //     if(details.length > 0) {
      //       var count = 0
      //       details.forEach(function(detail) {
      //         model.User.findById(detail.UserId)
      //         .then(function(user) {
      //           detail.name = user.name

      //           count++

      //           if(count == details.length) {
      //             res.render('task', {
      //               dataProject: project,
      //               dataProjectDetails: details
      //             })
      //           }
      //         })
      //       })
      //     } else {
      //       res.render('task', {
      //         dataProject: project,
      //         dataProjectDetails: details,
      //         dataUsers: users
      //       })
      //     }


      //   })
      // })
    // })

  })

  router.post('/add', (req, res)=>{
    // res.send(req.body.id)
    model.Detail.create(
      {
        task: req.body.task,
        UserId: req.body.UserId
      }).then((dataDetail)=>{
        // console.log('=============',dataDetail)
        res.redirect(`/task`)
      })
  })

  router.get('/edit/:idDetail',(req, res)=>{
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
              dataProject:dataProject,
              session: req.session
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
    // res.send(req.params)
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
