const apikey = "03a968316980213076eb885cb692d0d4"

var input = document.querySelector("input");
var btn = document.querySelector("button");

btn.addEventListener("click", function() {
    var city = input.value
    $.ajax({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`,
        // url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apikey}`
    }).then(function(data) {

        var cityName = data.name;
        var cityDate = new Date(data.dt * 1000).toLocaleDateString("en-US")
        var windSpeed = data.wind.speed;
        var dayTemp = Math.floor((data.main.temp - 273.15) * 1.80 + 32);
        var dayHumidity = data.main.humidity
        var displayCity = $("<h1>" + cityName + " " + cityDate + "</h1>");
        var displayWind = $("<p>wind speed: " + windSpeed + " mph</p>");
        var displayTemp = $("<p> temp: " + dayTemp + " &deg</p>");
        var displayHumidity = $("<p> humidity: " + dayHumidity + " %</p>")
        
        $(".jumbotron").append(displayCity, displayWind, displayTemp, displayHumidity);

        console.log(data);
        $.ajax({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apikey}`
        }).then(weather => {
            for (let i = 1; i < 6; i++) {
                var humidity = weather.daily[i].humidity
                var temp = Math.floor((weather.daily[i].temp.day - 273.15) * 1.80 + 32);
                var uvi = weather.daily[i].uvi
                var date = new Date(weather.daily[i].dt * 1000).toLocaleDateString("en-US")
                
                var cardTemp = $("<p> temp: " + temp + " &deg</p>");
                var cardHumidity = $("<p> humidity: " + humidity + " %</p>");
                var cardUvi = $("<p> UVIndex: " + uvi + " </p>");
                var cardDate = $("<p> date: " + date + " </p>");

                var cardDiv = $("<div>").addClass("card blue");
                
                cardDiv.append(cardDate, cardTemp, cardHumidity, cardUvi);
                $("#fiveDayForcast").append(cardDiv)
                 console.log(weather.daily[i]);
            }
        })
    })
})