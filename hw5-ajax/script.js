document.addEventListener("DOMContentLoaded", setUpButtons);

var apiKey = "cbd40f4ad6a1d7f3c0d6d5630107be2c";

function setUpButtons() {
  document
    .getElementById("button-to-get-weather")
    .addEventListener("click", function (event) {
      var cityName = document.getElementById("city-name").value;
      var zipCode = document.getElementById("zip-code").value;
      var countryCode = document.getElementById("country-code").value;
      var req = new XMLHttpRequest();

      if (cityName && countryCode) {
        req.open(
          "GET",
          `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}`,
          false
        );
      } else if (zipCode && countryCode) {
        req.open(
          "GET",
          `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`,
          false
        );
      }
      req.send(null);

      var response = JSON.parse(req.responseText);
      var temp = response.main.temp;
      var condition = response.weather[0]["main"];
      document.getElementById(
        "weather-result-header"
      ).textContent = `Weather: ${temp}, ${condition}`;

      event.preventDefault();
    });

  document
    .getElementById("button-to-post-some-text")
    .addEventListener("click", function (event) {
      var someText = document.getElementById("some-text").value;
      var req = new XMLHttpRequest();
      req.open("POST", "http://httpbin.org/post", false);
      req.setRequestHeader("Content-Type", "application/json");
      req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
          var response = JSON.parse(req.responseText);
          document.getElementById(
            "post-content-result-header"
          ).innerHTML = `<pre>${response.data}</pre>`;
        } else {
          console.log("Error in network request: " + req.statusText);
        }
      });
      req.send(JSON.stringify(someText));

      event.preventDefault();
    });
}
