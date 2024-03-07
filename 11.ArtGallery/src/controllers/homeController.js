const router = require('express').Router();
const galleryManager = require('../managers/galleryManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', async (req, res) => {
    const user = await galleryManager.getUser(req.user?._id).lean();

    const myPublish = user.myPublication.map((x) => x.title).join(', ');

    const publications = await galleryManager.getAll().lean();
    const userShared = publications.filter((x) => x.usersShared[0]._id.toString() === req.user?._id);
    const myShared = userShared.map((x) => x.title).join(', ');
    
        res.render('profile', { ...user, myPublish, myShared });

});

router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;