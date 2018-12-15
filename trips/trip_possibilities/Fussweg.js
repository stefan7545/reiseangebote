class Fussweg extends Trip {
    constructor (origin, destination) {
        let wayParameters = getWay(origin, destination);
        super (origin, destination, wayParameters["originDateTime"], wayParameters["destDateTime"], wayParameters["distance"], wayParameters["travelTime"]);
    this.price = 0;
    }
}