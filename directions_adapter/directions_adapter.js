var directionsService;
var directionsValue;

function initMap() {
    directionsService = new google.maps.DirectionsService;
}

function calculateDirectionsAPIRoute(origin, destination, travelTime, travelMode) {
    let travelTimeInSec = travelTime.getTime() / 60;
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        transitOptions: {
            arrivalTime: travelTime
        }
    }, function (response, status) {
        if (status === 'OK') {
            console.log(response);
            directionsValue = response;
            return response;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}