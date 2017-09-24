let express = require('express');
let router = express.Router();
let generalMiddleware = require('./middlewares/general');
let authorizationMiddleware = require('./middlewares/authorization');
let publicControllers = require('./controllers/public/router');
let userControllers = require('./controllers/users/router');
let adminControllers = require('./controllers/admin/router');

router.use(generalMiddleware);
router.use(publicControllers);
router.use(authorizationMiddleware);
router.use('/user', userControllers);
router.use('/admin', adminControllers);

module.exports = router;