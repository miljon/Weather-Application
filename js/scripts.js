$(document).ready(function () {

    navigator.geolocation.getCurrentPosition(function (position) {
        getWeatherFromServer(position.coords.latitude, position.coords.longitude);
    });


    $('.celcAndFarButton').click(function () {
        if ($('.temparature').text().includes("C")) {
            $('.temparature').text(round(cToF(getOnlyTemperature($('.temparature'))))+ "°F");
        } else {
            $('.temparature').text(round(fToC(getOnlyTemperature($('.temparature'))))+ "°C");
        }
    });
});

function getWeatherFromServer(lati, longi) {
    $.get(`https://fcc-weather-api.glitch.me/api/current?lat=${lati}&lon=${longi}`, function (data) {
        $('.cityName').html(data.name + ', ' + data.sys.country);
        $('.temparature').html(data.main.temp + "°C");
        $('.weather').html(data.weather[0].description);
        $('.weather-image').attr('src', data.weather[0].icon);
        $('.weather').html(data.weather[0].description);

        console.log(data.weather[0].icon);
        console.log('\'' + data.weather[0].icon + '\'');
        if ($('.celcAndFarButton').is(":disabled")) $('.celcAndFarButton').prop('disabled', false); 
    })
}

function cToF(celsius) {
    var cToFahr = celsius * 9 / 5 + 32;
    return cToFahr;
}

function fToC(fahrenheit) {
    var fToCel = (fahrenheit - 32) * 5 / 9;
    return fToCel;
} 

function getOnlyTemperature(str){
    console.log("getOnlyTemperature: " + str.text().substr(0, str.text().length - 2));
    return str.text().substr(0, str.text().length - 2);
}

function round(temp){
    return Math.round((temp * 100)) / 100;
}