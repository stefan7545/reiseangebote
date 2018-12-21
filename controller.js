
function generateTrips(leg) {
    generateTransitWays(leg);
}

function generateTransitWays(leg) {
    generateFussweg(leg);
    generatePrivatWagen(leg);
}

function generateFussweg(leg){
    let travelPlan = requestDirectionsAPIRoute(leg, "WALKING");
    var tripWay = new Fussweg(travelPlan);
    console.log(travelPlan);
}

function generatePrivatWagen(leg) {
    requestDirectionsAPIRoute(leg, "DRIVING");
}

function generateBahn(leg) {
    requestDirectionsAPIRoute(leg, "TRANSIT");
}
function requestDirectionsAPIRoute(leg, travelMode){
    return calculateDirectionsAPIRoute(
        leg["origin"]["place"],
        leg["destination"]["place"],
        new Date(leg["destination"]["dateTime"]),
        travelMode);
}