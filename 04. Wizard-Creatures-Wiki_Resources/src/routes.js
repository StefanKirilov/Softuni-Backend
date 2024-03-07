const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const heroController = require('./controllers/heroController');

router.use(homeController);
router.use('/users', userController);
router.use('/heros', heroController);
// router.get('*', (req, res) => {
//     res.redirect('404');
// });

module.exports = router;