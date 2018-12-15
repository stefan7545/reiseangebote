class Trip {
    constructor (origin, destination, originDateTime, destinationDateTime, distance, travelTime) {
        this._origin = origin;
        this._destination = destination;
        this._originDateTime = originDateTime;
        this._destinationDateTime = destinationDateTime;
        this._distance = distance;
        this._travelTime = travelTime;
    }




    get origin() {
        return this._origin;
    }

    get destination() {
        return this._destination;
    }

    get originDateTime() {
        return this._originDateTime;
    }

    get destinationDateTime() {
        return this._destinationDateTime;
    }

    get distance() {
        return this._distance;
    }

    get travelTime() {
        return this._travelTime;
    }
}