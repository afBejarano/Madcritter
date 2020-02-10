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
app.set('views', path.join('./html'));
app.set('layout', 'layout');
app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', hogan);
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
        res.cookie('user',values[0])
        home(res)
      }
      else{
        res.sendFile(path.join(__dirname + '/html/noesta.html'));
      }
    }
  })
});

function home(res){
  var f;
  data = fs.readFileSync('./html/tasks.html');
  template = hogan.compile(data);
  res.send(template.render({'tasks':[{'id':'hola'},{'id':'hola1'},{'id':'hola2'}]}));
}

app.get('/', function (req, res) {
  if(req.cookies.user)
    home(res);
  else
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.listen(6969, function () {
  console.log('Example app listening on port 6969!');
});


