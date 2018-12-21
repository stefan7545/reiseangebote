<!DOCTYPE html>
<html>
<head>
    <title>Place Searches</title>
    <script>
        // This example requires the Places library. Include the libraries=places
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


    </script>
</head>
<body>
<div id="map"></div>
<script src="places_adapter.js"></script>
<script src="../directions_adapter/directions_adapter.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjEnwFyOFVJjAd3Mpj97F6iVd4L3_yRMo&libraries=places"></script>
<script>
    initPlaceService().then(function () {

        var arrivalTime = "2018-12-18T00:30:00+01:00";
        console.log("hi");
        callInitMap({lat: -33.867, lng: 151.195}, arrivalTime);
    });
</script>
</body>
</html>