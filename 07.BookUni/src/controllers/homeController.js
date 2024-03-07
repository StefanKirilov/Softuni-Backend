const router = require('express').Router();

const hotelManager = require('../managers/hotelManager');

router.get('/', async (req, res) => {
    const hotels = await hotelManager.getAll().lean();
    const haveHotel = hotels.length > 0;

    res.render('home', { hotels, haveHotel });
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', async (req, res) => {
    // const user = await hotelManager.getByOwner(req.user._id).lean();

    res.render('profile');
});



module.exports = router;