var inspect;

function searchNearbyPlace(position, type) {
    return new Promise(resolve => {
        placesService.nearbySearch({
            location: position,
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: [type]
        }, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var nextPlaces = [];
                for (var i = 0; i < results.length; i++) {
                    nextPlaces.push(getEntryValue(results[i]));
                }
                nextPlaces.push(getEntryValue(results[0]));
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

function callInitMap(position, arrivalTime) {
    return new Promise(async resolve => {
        const type = "train_station";
        await searchNearbyPlace(position, type)
            .then(function (nextStations) {
                console.log(nextStations);
                inspect = nextStations;
                for (let i = 0; i < 1; i++) {
                    calculateDirectionsAPIRoute(
                        position,
                        {lat: nextStations[i].position.lat(), lng: nextStations[i].position.lng()},
                        new Date(arrivalTime),
                        "WALKING")
                        .then(function (tripWay) {
                            console.log(tripWay);
                            resolve(new Fussweg(tripWay));
                        });
                }
            })
    })
}

var intercept;

function generateCombinedTrip() {
    new Promise(resolve => {
        var aTime = "2018-12-18T00:30:00+01:00";
        var startpoint = {lat: 47.8789417, lng: 11.694407100000035};
        var endpoint = {lat: 50.1043513, lng: 8.650422899999967};
        callInitMap(startpoint, aTime)
            .then(function (fussweg1) {
                callInitMap(endpoint, aTime)
                    .then(function (fussweg2) {
                        console.log(fussweg1.getLegInfo("end_location"));
                        console.log(fussweg2.getLegInfo("start_location"));
                        console.log(fussweg2.getLegInfo("start_address"));
                        intercept = fussweg1;
                        var arrivalTime = new Date(aTime);
                        arrivalTime.setMinutes(arrivalTime.getMinutes() - (fussweg2.getLegInfo("duration").value / 60));
                        calculateDirectionsAPIRoute(
                            fussweg1.getLegInfo("end_location"),
                            fussweg2.getLegInfo("end_location"),
                            arrivalTime,
                            "TRANSIT"
                        )
                            .then(function (tripWay) {
                                var combinedTrip = new CombinedTrip();
                                combinedTrip.addTrip(fussweg1);
                                combinedTrip.addTrip(new Bahn(tripWay), "TRANSIT");
                                combinedTrip.addTrip(fussweg2);
                                intercept = combinedTrip;
                                resolve(combinedTrip);
                            })
                    })
            })
    })
}