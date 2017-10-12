
let express = require('express');
let app = express();
var bodyParser = require('body-parser')
let session = require('express-session')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(session(
  {
    secret: 'Fox',
    resave: false,
    saveUninitialized: true
  }
))

let index = require('./routers/index');
let user = require('./routers/user');
let project = require('./routers/project');
let task = require('./routers/task');
let login = require('./routers/login');
let signup = require('./routers/signup');
let logout = require('./routers/logout');

app.use('/login', login);
app.use('/signup', signup);
app.use('/user', user);
app.use('/task', task);
app.use('/', index);
app.use('/project', project);
app.use('/logout', logout);

app.listen(process.env.PORT || '3000')