var express = require('express')
var router = express.Router()
let model = require('../models')
let sendemail =  require('../helper/sendEmail')

router.use(function(req, res, next) {
  if (req.session.hasOwnProperty('username')) {
    next();
  } else {
    res.redirect('/login')
  }
})
// define the home page route
router.get('/', function(req, res) {
  model.Project.findAll()
    .then(dataProjects => {
      res.render('project', {
        dataProjects: dataProjects,
        session: req.session
      })
    })
})

router.get('/add', (req, res) => {
  res.render('addProject', {
    session: req.session
  })
})

router.post('/add', (req, res) => {
  model.Project.create({
    name: req.body.name,
    deadline: req.body.deadline
  }).then(() => {
    res.redirect('/project')
  })
})

router.get('/edit/:id', (req, res) => {
  // console.log('==============',req.params.id)
  model.Project.findById(req.params.id).then(editProject => {
    res.render('editProject', {
      editProject: editProject,
      session: req.session
    });
  })
})

router.post('/edit/:id', (req, res) => {
  model.Project.update({
    name: req.body.name,
    deadline: req.body.deadline
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/project')
  })
})

router.get('/delete/:id', (req, res) => {
  // console.log(req.params.id)
  model.Project.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/project');
    })
})

router.get('/task/:id', (req, res) => {
  model.Detail.findAll()
    .then(dataTask => {
      model.Project.findById(req.params.id)
        .then((dataProject) => {
          dataProject.getDetails()
            .then((details) => {

              res.render('assignTask', {
                dataProject: dataProject,
                dataTask: dataTask,
                dataProjectDetails: details,
                session: req.session
              })
            })
        })
    })
})

router.post('/task/:id', (req, res) => {
  model.Project_Detail.create({
      ProjectId: req.params.id,
      DetailId: req.body.DetailId
    })
    .then(() => {
      res.redirect(`/project/task/${req.params.id}`)
    })
})

router.get('/task/delete/:id', (req, res) => {
  // console.log(req.params.id)
  model.Project_Detail.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/project/task');
    })
})
router.get('/sendEmail/:id', (req, res)=>{
  model.Project.findById(req.params.id)
    .then(dataProject=>{
       sendemail(dataProject.name, dataProject.deadline);
       res.redirect('/project')
    })
})

module.exports = router;
