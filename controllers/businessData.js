const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);

exports.getBusinessData = async (req, res, next) => {
    searchRequest = req.body;

    try {
        if (req.body.id) {
            let data = await client.business(req.body.id);
            let prettyJson = JSON.stringify(data.jsonBody, null, 4);
            //	console.log(prettyJson);
            return res.status(200).json({
                success: true,
                data: data
            })
        } else {
            let data = await client.search(searchRequest);
            let firstResult = data.jsonBody.businesses[0];
            let prettyJson = JSON.stringify(firstResult, null, 4);
            //	console.log(prettyJson);
            return res.status(200).json({
                success: true,
                data: data
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: 'server error'
        });
    }
};

exports.getDetailedBusinessData = async (req, res, next) => {

}