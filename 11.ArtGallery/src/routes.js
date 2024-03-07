const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const galleryController = require('./controllers/galleryController');

router.use(homeController);
router.use('/users', userController);
router.use('/gallery', galleryController);
router.get('*', (req, res) => {
    res.redirect('404');
});

module.exports = router;