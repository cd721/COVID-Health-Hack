const url = require('url');
const FOURSQUARE_ID = process.env.FOURSQUARE_ID;
const FOURSQUARE_SECRET = process.env.FOURSQUARE_SECRET;
const foursquare_date = 20202006; //A date in YYYYMMDD format- this server will make requests to the latest version of the Foursquare API as of this date



exports.getFoursquareBusinessData = async (req, res, next) => {
    forsquarePlaceId = req.body.id;
    const placeReqUrl = new URL(`/${foursquarePlaceId}`, 'https://api.foursquare.com/v2/venues/');
    placeReqUrl.search(`v=${foursquare_date}`);
    try {
        let data = await fetch(placeReqUrl);
        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: 'server error'
        });
    }

}