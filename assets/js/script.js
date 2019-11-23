$(document).ready(function () {

    setInterval(function () {
        $("#dateDisplay").text(moment().format("MMMM DD, YYYY"))
        setColors();
    }, 1000);


    $("#submit").on("click", function () {
        var city = $("#city").val().trim();
        cityList = JSON.parse(localStorage.getItem("city"));
        if (cityList === null) {
            cityList = [];
        }
        cityList.push(city);
        localStorage.setItem("city", JSON.stringify(cityList));


        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + "&appid=1f2cf6d8fabf4123eb61df651c4f522d";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);

                lowTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
                highTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);

                $("#lowDiv").text("Low of: " + lowTempFaren + "°F");
                $("#highDiv").text("High of: " + highTempFaren + "°F");
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#description").text("Today's Weather: " + response.weather[0].description);
                weather_icon = response.weather[0].icon + ".png"
                $("#cityHeader").text(response.name);

                if (response.weather[0].main === "Clouds") {
                    //change day div to cloudy mode
                }
                else if (response.weather[0].main === "Rain") {
                    //change day div to rainy mode
                }
                var cityButton = $("<button>");
                cityButton.text(response.name);
                $("#citiesDiv").prepend(cityButton);
                $("#citiesDiv").append("<br/>");
                cityButton.attr("class", "cityButton");

            });


        var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city + "&appid=1f2cf6d8fabf4123eb61df651c4f522d";

        $.ajax({
            url: queryURLForecast,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                localStorage.setItem("forecast", JSON.stringify(response));
                result = JSON.parse(localStorage.getItem("forecast"));
                newDays = [4, 12, 20, 28, 36]
                for (var i = 0; i < newDays.length; i++) {
                    var dayTemp = result.list[i].main.temp;
                    var dayTempFaren = Math.floor(((dayTemp - 273.15) * 1.8) + 32);
                    var dayDate = result.list[i].dt;
                    var dayHumidity = result.list[i].main.humidity;
                    var dayWindSpeed = result.list[i].wind.speed;
                    var dayWeather = result.list[i].weather[0].description;
                    var dayWeatherId = result.list[i].weather[0].main;
                    var dayIcon = result.list[i].weather[0].icon

                    $("#day" + newDays[i] + "_date").text(moment.unix(dayDate).format("MMMM Do"));
                    $("#day" + newDays[i] + "_date").attr("class", "date");
                    $("#day" + newDays[i] + "_temp").text(dayTempFaren + "°F");
                    $("#day" + newDays[i] + "_humidity").text(dayHumidity + "% Humidity");
                    $("#day" + newDays[i] + "_wind").attr("class", "windText");
                    $("#day" + newDays[i] + "_wind").text("Wind: " + dayWindSpeed + " MPH");
                    $("#icon" + newDays[i]).attr("src", "http://openweathermap.org/img/wn/" + dayIcon + ".png");
                };





            });














        // $("#cityButton").on("click", function () {
        //     event.preventDefault();
        //     var buttonText = $("#cityButton").val().trim();

        //     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        //         buttonText + "&appid=1f2cf6d8fabf4123eb61df651c4f522d";

        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        //     })

        //         .then(function (response) {



        //         });
    });

});