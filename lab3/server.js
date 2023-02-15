const request = require('request');
const express = require('express');
const app = express()

app.use(express.static('./public'));

// app.get('/matches', function(req, res){
//   request('https://app.sportdataapi.com/api/v1/soccer/matches?apikey=581d6100-abe8-11ed-8bf5-b909ae2d4cd2&season_id=3161&date_from=2022-08-06', function (error,response,body){
//     if (!error && response.statusCode == 200) {
//       parsed = JSON.parse(body);
//       // for (let i = 0; i < 10; i++){
//       //   var data = parsed['data'][i]['match_id'];
//       //   console.log(data);
//       //   res.json(data); 

//       // }
//       var data = parsed['data'][0]['match_id'];
//         console.log(data);
//       res.json(parsed);
//     }
//   })
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const options = {
  method: 'GET',
  url: 'https://football98.p.rapidapi.com/premierleague/results',
  headers: {
    'X-RapidAPI-Key': 'e297e832a7mshf3f9db167479cc7p1fe24fjsn6456a0d675c1',
    'X-RapidAPI-Host': 'football98.p.rapidapi.com',
    useQueryString: true
  }
};

app.get('/soccer', function(req, res){
  res.sendFile(__dirname + '/public/img/soccer_player.png');
});
// app.get('/premier', function(req, res){
//   res.sendFile(__dirname + '/public/img/premier_logo.png');
// });
// app.get('/betting', function(req, res){
//   res.sendFile(__dirname + '/public/img/betting.png');
// });
// app.get('/news1', function(req, res){
//   res.sendFile(__dirname + '/public/img/news1.png');
// });

app.get('/match', function(req, res){
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parsed = JSON.parse(body);
    }
    console.log(body);
    res.json(parsed);
  });
});

app.listen(3000, '127.0.0.1');
console.log('Server running at 127.0.0.1:3000');