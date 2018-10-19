var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
//var apiKey = '80c1245dc664673c681da5a0f58cf629';
var apiKey = 'f5bea87403d8700b58fb713995bc7a2e';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null })
})

app.post('/', function (req, res) {
  var lat = req.body.lat;
  var lng = req.body.lng;

  // old way
  // var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng +'&units=metric&appid='+ apiKey;

  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, data) {
    if(err){
      res.render('index', {weather: null, error: err});
    } else {
      var weatherData = JSON.parse(data)
      if(weatherData.cod != 200){
        res.render('index', {weather: null, error: 'Error'});
      } else {

        res.json(weatherData)

        //var temp = weatherData.main.temp;
        //var name = weatherData.name;
        //var text = 'Temp in ' + name + ' is: ' + temp + '°C'
        //res.render('details', {weather: text, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
