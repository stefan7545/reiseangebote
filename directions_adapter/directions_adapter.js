var directionsService;

function initMap() {
    directionsService = new google.maps.DirectionsService;
}

function calculateRoute(origin, destination, travelTime, travelMode) {
    let travelTimeInSec = travelTime.getTime() / 60;
    console.log(travelTimeInSec);
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
            return response;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}