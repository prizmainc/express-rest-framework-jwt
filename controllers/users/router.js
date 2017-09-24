let express = require('express');
let router = express.Router();


router.use(function (req, res, next) {
    if (req.decoded.roles.indexOf(2) !== -1) {
        next();
    } else {
        res.status(403).send('users pages not granted');
    }
});

router.get('/', function (req, res, next) {
    res.send('users home page');
});

module.exports = router;
