let express = require('express');
let app = express();
let router = express.Router();
let auth = require('../../models/auth');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Welcome to express-rest-jwt-framework'});
});

router.post('/authenticate', function (req, res) {

    if(req.body.username === undefined && req.body.password === undefined && req.body.username.trim() === '' && req.body.password === ''){
        res.send('username & password required');
    }

    authenticate(req.body.username, req.body.password, function (userNotAvailable, passwordIncorrect, token) {
        if(userNotAvailable){
            res.send('no user available');
        }
        if(passwordIncorrect){
            res.send('error password');
        }
        res.json({
            status: 'success',
            token: token
        });
    });
});

module.exports = router;
