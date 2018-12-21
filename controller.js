var intercept;
var tripSelection;
var finalResult;

async function generateTravelSolutions(leg) {
    let result1 = getGeocodePosition(leg, leg.origin.place, "origin");
    let result2 = getGeocodePosition(leg, leg.destination.place, "destination");
    await result1 + await result2;
    //intercept = leg;

    tripSelection = new TripSelections();

    //let carWay = generateCarWay(leg);
    //let fussweg = generateFussweg(leg);
    //finalResult = await fussweg + await carWay;
    //console.log(carWay);
    let wait1 = generateAndAddToSelection(leg, function (res) {
        return new Fussweg(res)
    }, "WALKING");
    let wait2 = generateAndAddToSelection(leg, function (res) {
        return new Privatwagen(res)
    }, "DRIVING");
    let wait3 = generateCombinedTripSolutionsWithBahn(leg, "WALKING");
    await wait1 + await wait2 + await wait3;

    console.log(tripSelection);

    //tripSelection.addSelection(generateCarWay(leg), "DRIVING");
    //tripSelection.addSelection(generateFussweg(leg), "WALKING");
    //tripSelection.addSelection(generateCombinedTripSolutionsWithBahn(leg, "WALKING"), "COMBINED");
}

function getGeocodePosition(leg, address, direc) {
    return new Promise(function (resolve, reject) {
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === 'OK') {
                intercept = results;
                leg[direc].geoCode = results[0].geometry.location;
                resolve(1);
            } else {
                reject(Error('Geocode was not successful for the following reason: ' + status));
            }
        });
    });
}

function generateAndAddToSelection(leg, method, travelMode) {
    return new Promise(resolve => {
        return requestDirectionsAPIRoute(leg, travelMode)
            .then(function (result) {
                tripSelection.addSelection(method(result), travelMode);
                resolve(1);
            })
    })
}

function requestDirectionsAPIRoute(leg, travelMode) {
    return calculateDirectionsAPIRoute(
        leg["origin"]["place"],
        leg["destination"]["place"],
        new Date(leg["destination"]["dateTime"]),
        travelMode);
}

function generateCombinedTripSolutionsWithBahn(leg, externalTravelMode) {
    new Promise(resolve => {
        var aTime = leg.destination.dateTime;
        var startpoint = {lat: leg.origin.geoCode.lat(), lng: leg.origin.geoCode.lng()};
        var endpoint = {lat: leg.destination.geoCode.lat(), lng: leg.destination.geoCode.lng()};
        generateWaysToNextTrainStation(startpoint, aTime, externalTravelMode)
            .then(function (fussweg1) {
                generateWaysToNextTrainStation(endpoint, aTime, externalTravelMode)
                    .then(function (fussweg2) {
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
                                tripSelection.addSelection(combinedTrip, "COMBINED");
                                resolve(1);
                            })
                    })
            })
    })
}