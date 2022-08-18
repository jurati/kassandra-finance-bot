const config = require("../config");
const request = require("request");

function setNickname(member) {
    request('https://kassandra.finance/api/overview', function (error, response, body) {
        member.setNickname(`KACY: $${JSON.parse(body).kacyPrice}`)
    });
}

module.exports = { setNickname };