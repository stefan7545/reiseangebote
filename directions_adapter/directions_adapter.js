const API_KEY = 'AIzaSyDwMehy8bb37T65BetCsgavnh3FCXFI0N8';

function request_direction() {
    var params = {
        'origin': "7+Jahnstraße+Holzkirchen+BY",
        'destination': "201+Mainzer+Landstraße+Frankfurt+am+Main+HE",
        'key': API_KEY
    };
    console.log(params);
    $.ajax({
        url: "http://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyDwMehy8bb37T65BetCsgavnh3FCXFI0N8"
    })
        .done(function (result) {
            console.log(result);
        })
}