class TripSelections {
    constructor() {
        this._selection = [];
    }

    addSelection(trip, travelMode) {
        this._selection.push({travelMode: travelMode, trip: trip});
    }
}