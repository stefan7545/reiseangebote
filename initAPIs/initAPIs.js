var placesService;
var result;
var directionsService;

function initPlaceService() {
    return new Promise(function (resolve, reject) {
        infowindow = new google.maps.InfoWindow();
        placesService = new google.maps.places.PlacesService(map);
        directionsService = new google.maps.DirectionsService;
        if (infowindow && placesService && directionsService) {
            resolve(1);
        } else {
            reject(Error("something went wrong in initPlaceService"));
        }
    });
}