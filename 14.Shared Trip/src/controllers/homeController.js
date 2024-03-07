const router = require('express').Router();
const tripManager = require('../managers/tripManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', async (req, res) => {
    const user = await tripManager.getUser(req.user?._id).lean();
    let count = user.tripsHistory.length;

    const myTrips = user.tripsHistory;
    
        res.render('profile', { ...user, count, myTrips });

});

router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;