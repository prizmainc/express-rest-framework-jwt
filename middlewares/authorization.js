let express = require('express');
let router = express.Router();
let auth = require('../models/auth');

router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.param('token') || req.headers['authorization'];

    if (token) {
        verifyUser(token, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' + err});
            } else {
                req.decoded = decoded; //save to request for use in other routes
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

});


module.exports = router;