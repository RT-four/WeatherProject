const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const apiId = "6649915a30c1849c97827a0979c4f290";
  const units = "metric";
  const cityName = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiId + "&units=" + units;
  console.log(url);
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      // console.log(weatherData);
      var temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      var weatherIcon = weatherData.weather[0].icon;
      var weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write("<h1> The weather in " + cityName + " is " + weatherDescription + ".</h1>");
      res.write("<h1>Temperature in " + cityName + " is " + temp + " degrees.</h1>");
      res.write('<img src="' + weatherIconURL + '">');
      res.send();
    });
  });
});


app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});