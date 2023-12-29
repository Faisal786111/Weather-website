const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.opencagedata.com/geocode/v1/json?q=" + encodeURIComponent(address) + "&key=0bd9f448f6a04196b80ab47b0e029fd4";

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect with the location services!!", undefined);
        } else if ( body.results.length === 0) {
            callback("Unable to identify the location!! Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude:body.results[0].geometry.lat,
                longtitude:body.results[0].geometry.lng,
                location:body.results[0].formatted
            });
        }
    });
};



module.exports = geocode