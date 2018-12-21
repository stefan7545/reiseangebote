var infowindow;
var service;
var result;
var directionsService;
var directionsValue;

function initPlaceService() {
    return new Promise(function (resolve, reject) {
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        directionsService = new google.maps.DirectionsService;
        if (infowindow && service) {
            resolve(1);
        } else {
            reject(Error("something went wrong in initPlaceService"));
        }
    });
}

function searchNearbyPlace(position, type) {
    return new Promise(resolve => {
        service.nearbySearch({
            location: position,
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: [type]
        }, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var nextPlaces = [];
                for (var i = 0; i < results.length; i++) {
                    nextPlaces.push(getEntryValue(results[i]));
                }
                nextPlaces = results[0];
                resolve(nextPlaces);
            }
        });
    })
}

function getEntryValue(place) {
    return {
        'station_name': place.name,
        'position': place.geometry.location,
        'vicinity': place.vicinity,
        'distance': null
    }
}

async function callInitMap(startpoint, arrivalTime) {
    var type = "train_station";
    var nextStations = await searchNearbyPlace(startpoint, type)
        .then(function (nextStations) {
            console.log(nextStations);
            nextStations.forEach(function (elem) {
                var tripWay = new Fussweg(calculateDirectionsAPIRoute(
                    startpoint,
                    {lat: nextStations[0].position.lat(), lng: nextStations[0].position.lng()},
                    new Date(arrivalTime),
                    "WALKING"));
                console.log(way);
            })
        })
}
