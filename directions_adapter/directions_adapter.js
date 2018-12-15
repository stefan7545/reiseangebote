var directionsService;

function initMap() {
    directionsService = new google.maps.DirectionsService;
    calculateRoute("Holzkirchen, BY", "Frankfurt am Main, NY", "TRANSIT");
}

function calculateRoute(origin, destination, travelMode) {
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: travelMode
    }, function (response, status) {
        if (status === 'OK') {
            console.log(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}