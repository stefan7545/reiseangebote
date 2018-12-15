function generateTrips(leg) {
    generateTransitWays(leg);
}

function generateTransitWays(leg) {
    console.log(calculateRoute(
        leg["origin"]["place"],
        leg["destination"]["place"],
        new Date(leg["destination"]["dateTime"]),
        'TRANSIT'));
}