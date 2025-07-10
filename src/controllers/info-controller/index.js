const info_controller = function (req, res) {
    console.log("request recvied at info_controller");
    return res.json({msg: 'ok', success: true, error: '', data : []});
}

module.exports = info_controller;