/**
 * Get the user's location and displays it on the page. This function will be called when the site loads.
 */
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            document.getElementById("placesNearYou").innerText = "Places near you:";


            // const api_url = '';
            // const response = await fetch(api_url);
            // console.log(response.headers.get("Content-Type"));

            // const json = await response.json();
            // console.log(json);
        });
    } else {
        document.getElementById("placesNearYou").innerHTML = "This browser does not support geolocation.";
    }
}

/**
 * This function is executed when your location is found.
 * 
 * @param position a GeolocationPosition object (the user's location)
 */
function locationSuccess(position) {

}

/**
 * This function is executed when there is an error in determining your location.
 * @param position a GeolocationPosition object (the user's location)
 *  */
function locationFailure(position) {
    document.getElementById("placesNearYou").innerHTML = "Your location could not be found.";
}

/**
 *
 */