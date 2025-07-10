const {httStatusCode} = require('http-status-codes')
const about_controller = function (req, res) {
    console.log("request recvied at about_controller");
    return res.json({msg: 'ok', success: true, error: '', data : []});
}

module.exports = about_controller ;