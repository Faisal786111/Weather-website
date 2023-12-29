const request = require("request")

const forecast = (lat , lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=67dc95ec311763b5964e5b79f8f52de4&query=${encodeURIComponent(lat)},${encodeURIComponent(lng)}`;

    request({url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect with weather services!", undefined);
        } else if (body.error) {
            callback("Unable to identify the location!", undefined);
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0]+". It is currently "+ body.current.temperature +" degrees out. There is a "+body.current.feelslike+"% chance of rain."
            );
        }
    });
};

module.exports = forecast