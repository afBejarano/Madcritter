var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var hogan = require('hogan.js');
const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config();

var connectionString = `postgresql://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`

const client = new Client({
  connectionString: connectionString,
})
client.connect().catch((err) => console.error(err))

var app = express();
app.use(express.urlencoded())
app.use(cookieParser());

app.post('/login', function (req, res) {
  const text = 'SELECT * FROM USERS WHERE USER_A = $1 AND PASS = $2'
  const values = [req.body.user, req.body.password]
  client.query(text, values, (err, resp) => {
    if (err) {
      console.log(err.stack)
    } else {
      if (resp.rows[0]){
        const sql = 'SELECT * FROM USERROLES WHERE USER_A = $1 AND IDROLEUSER = 1'
        const values1 = [req.body.user]
        var aa;
        client.query(sql, values1, (err, resp) => {aa = {name:values[0], isadmin : resp.rows[0]? true: false};res.cookie('user',aa); home(res, aa);});
      }
      else{
        res.sendFile(path.join(__dirname + '/html/noesta.html'));
      }
    }
  })
});

function home(res,x){
  var f;
  data = fs.readFileSync('./html/tasks.html' , "utf8");
  template = hogan.compile(data);
  const sqlquery = 'SELECT TASKS.IDTASKS FROM TASKS, USERROLES WHERE TASKS.USER_A = USERROLES.IDROLEUSER AND USERROLES.USER_A  = $1'
  const values = [x.name]
  client.query(sqlquery, values,(err, resp)=>{
    if(x.isadmin){
      var projs;
      const sql2 = 'SELECT * FROM projects'
      client.query(sql2,(err,resp2)=>{
        projs = resp2.rows;
        console.log(resp2)
        res.send(template.render({'tasks':resp.rows, isadmin: {projes:projs}}));
      });
    }  
  });
}

app.get('/logout', function(req, res){
  res.clearCookie('user');
  res.sendFile(path.join(__dirname + '/html/index.html'));
})

app.get('/', function (req, res) {
  var x = req.cookies.user;
  if(x)
    home(res, x);
  else
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
