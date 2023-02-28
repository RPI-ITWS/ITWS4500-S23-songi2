const request = require('request');
const express = require('express');
var bodyParser = require('body-parser');
const app = express()

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true })); 

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.post('/addUser',function (req, res){
    const user = {
      name: req.body.name,
    }
    fetch('http://universities.hipolabs.com/search?name=' + req.body)
    .then(data => data.json())
    console.log(data)
    console.log(user)
    res.send(user)
  });

// app.get('/addUser', function (req, res){
//   request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       parsed = JSON.parse(body);
//     }
//     res.json(parsed);
//     console.log(parsed);
//   });

// })

// app.get('/api', (req, res)=> {  
//     fetch('http://universities.hipolabs.com/search?name=' + req.body)
//     .then(data => data.json())
//     .then(success => res.json(success));
// });


// app.get('/match', function(req, res){
//   request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       parsed = JSON.parse(body);
//     }
//     res.json(parsed);
//   });
// });



app.listen(3000, '127.0.0.1');
console.log('Server is Running!');