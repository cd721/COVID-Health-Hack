var numListings = 6;




/*
 * Get the user's location and displays it on the page. This function will be called when the site loads.
 */
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            document.getElementById("placesNearYou").innerText = "Places near you:";
            console.log(position);
            var i = 1;
            console.log(i);

            //was making too many api requests per second
            const loadResults = setInterval(() => {
                showResult(i);
                i++;
                if (i > numListings) {
                    clearInterval(loadResults);
                }
            }, 700);
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
async function showResult(businessIndex) {
    console.log(`Showing result for business ${businessIndex}`);

    const businessSearchBody = {
        term: 'verona',
        location: 'randolph nj'
    }
    const businessSearchResults = await fetch('/businesses/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(businessSearchBody)


    });
    const businessSearchResultsJson = await businessSearchResults.json();

    const currentBusiness = businessSearchResultsJson.data.jsonBody.businesses[businessIndex - 1];
    //if business has no img, yelp returns image_url of empty string
    const cardImgUrl = currentBusiness.image_url
    document.getElementById(`businessImg${businessIndex}`).src = cardImgUrl;

    const businessName = currentBusiness.name;
    document.getElementById(`businessName${businessIndex}`).innerHTML = businessName;

    const yelpPageLink = document.createElement("a");
    yelpPageLink.href = currentBusiness.url;
    yelpPageLink.innerText = "Visit the Yelp Page";
    document.getElementById(`infoBusiness${businessIndex}`).appendChild(yelpPageLink);




    const formattedPhoneNumber = currentBusiness.display_phone;
    document.getElementById(`callBusiness${businessIndex}`).innerHTML = `Call ${formattedPhoneNumber}`;
    document.getElementById(`callBusiness${businessIndex}`).href = `tel:${currentBusiness.display_phone}`;

    const idSearchBody = {
        id: currentBusiness.id,
        location: 'randolph nj'
    }
    const businessResult = await fetch('/businesses/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(idSearchBody)
    });

    const detailedBusinessResult = await businessResult.json();
    //console.log(detailedJson);
    const currentBusinessDetailed = detailedBusinessResult.data.jsonBody;
    const open = currentBusinessDetailed.hours[0].is_open_now;

    if (!open) {
        console.log(`${businessName} is closed`)
        const closedBadge = document.createElement("span");
        closedBadge.className = "badge badge-danger";

        const closedBadgeText = document.createElement("p");
        closedBadge.appendChild(closedBadgeText);
        closedBadgeText.innerText = "Closed";
        document.getElementById(`businessName${businessIndex}`).appendChild(closedBadge);
    }

    const supportedTransactions = currentBusinessDetailed.transactions;

    supportedTransactions.forEach((currentTransaction) => {
        switch (currentTransaction) {
            case "pickup":
                takeoutIcon();
                break;
            case "delivery":
                deliveryIcon();
                break;
            case "restaurant reservation":
        }
    });
}

function addListingContainer() {
    console.log("w");
    numListings++;
    var listElement = document.createElement("li");

    var card = document.createElement("div");
    card.id = `businessListing${numListings}`
    card.className = "card w-25 h-25";

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    var cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.id = `businessImg${numListings}`
    card.appendChild(cardImg);

    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-tile";
    cardTitle.id = `businessName${numListings}`;
    cardBody.appendChild(cardTitle);



    document.getElementById("suggestionsList").appendChild(listElement.appendChild(card));

}

function takeoutIcon() {
    let takeoutIcon = document.createElement("svg");
    takeoutIcon.className = "bi bi basket3";
    takeoutIcon.width = "1em";
    takeoutIcon.height = "1em";
    takeoutIcon.viewBox = "0 0 16 16";
    takeoutIcon.fill = "currentColor";
    takeoutIcon.xmlns = "http://www.w3.org/2000/svg";

    let path1 = document.createElement("path");
    path1['fill-rule'] = "evenodd";
    path1.d = "M10.243 1.071a.5.5 0 0 1 .686.172l3 5a.5.5 0 1 1-.858.514l-3-5a.5.5 0 0 1 .172-.686zm-4.486 0a.5.5 0 0 0-.686.172l-3 5a.5.5 0 1 0 .858.514l3-5a.5.5 0 0 0-.172-.686z";

    let path2 = document.createElement("path");
    path2.d = "M0 6.5A.5.5 0 0 1 .5 6h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zM.81 9c0 .035.004.07.011.105l1.201 5.604A1 1 0 0 0 3 15.5h10a1 1 0 0 0 .978-.79l1.2-5.605A.495.495 0 0 0 15.19 9h-1.011L13 14.5H3L1.821 9H.81z";

    takeoutIcon.appendChild(path1);
    takeoutIcon.appendChild(path2);

    return takeoutIcon;
}

function deliveryIcon() {
    const deliveryIcon = document.createElement("svg");
    deliveryIcon.className = "bi bi house";
    deliveryIcon.width = "1em";
    deliveryIcon.height = "1em";
    deliveryIcon.viewBox = "0 0 16 16";
    deliveryIcon.fill = "currentColor";
    deliveryIcon.xmlns = "http://www.w3.org/2000/svg";

    const path1 = document.createElement("path");
    path1['fill-rule'] = "evenodd";
    path1.d = "M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z";

    const path2 = document.createElement("path");
    path2.d = "M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z";

    deliveryIcon.appendChild(path1);
    deliveryIcon.appendChild(path2);

    return deliveryIcon;
}