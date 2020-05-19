/**
 * The h3 header that will read "Places near you:" if your location is found.
 */
var locationInfoDisplay = document.getElementById("placesNearYou"); 


/**
 * This function is executed when your location is found.
 * @param position a GeolocationPosition object (the user's location)
 */
function locationSuccess(position) {
    document.getElementById("placesNearYou").innerText = "Places near you:";
}

/**
 * This function is executed when there is an error in determining your location.
 * @param position a GeolocationPosition object (the user's location)
 *  */
function locationFailure(position) {
    document.getElementById("placesNearYou").innerHTML = "Your location could not be found.";
}



/**
 * Get the user's location and displays it on the page. This function will be called when the site loads.
 */
function getUserLocation() {
    

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure);
    } else {
        document.getElementById("placesNearYou").innerHTML = "This browser does not support geolocation.";
    }
}
