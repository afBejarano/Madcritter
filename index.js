var express = require('express');
var path = require('path');
const { Client } = require('pg');
require('dotenv').config();

var connectionString = `postgresql://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`

const client = new Client({
  connectionString: connectionString,
})
client.connect().catch((err) => console.error(err))

var app = express();

app.use(express.urlencoded())

app.post('/login', function (req, res) {
  const text = 'SELECT * FROM USERS WHERE US = $1 AND PASS = $2'
  const values = [req.body.user, req.body.password]
  client.query(text, values, (err, resp) => {
    if (err) {
      console.log(err.stack)
    } else {
      if (resp.rows[0]){
        res.sendFile(path.join(__dirname + '/entro.html'));
      }
      else{
        res.sendFile(path.join(__dirname + '/noesta.html'));
      }
    }
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


