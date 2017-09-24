let express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
    if (req.decoded.roles.indexOf(1) !== -1) {
        next();
    } else {
        res.status(403).send('admin pages not granted');
    }
});

router.get('/', function (req, res) {
    res.send('Admin home page')
});


module.exports = router;