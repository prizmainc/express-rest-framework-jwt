let express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
    console.log('LOGGED');
    next()
});

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

module.exports = router;