var express = require('express');
var path = require('path');
const { Client } = require('pg');
require('dotenv').config();

var connectionString = `postgresql://${process.env.USERA}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`

const client = new Client({
  connectionString: connectionString,
})
client.connect().catch((err)=> console.error(err))

var app = express();

app.use(express.urlencoded())

app.post('/login', function (req, res) {
  console.log(req.body); 
  client.query('SELECT * FROM USERS', (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows)
    }
  })  
  res.sendFile(path.join(__dirname + '/entro.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


