const router = require('express').Router();

const courseManager = require('../managers/courseManager');

router.get('/',async (req, res) => {
        const courses = await courseManager.getAll().lean();
    
    res.render('home', { courses });
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.post('/search', async (req, res) => {


    const searchCourses = await courseManager.getSearch().lean();

    const search = req.body.search;

    const courses = searchCourses.filter((x) => x.title == search );

    console.log(courses);

    res.render('home', { courses });
});

// router.get('/profile', async (req, res) => {
//     const photos = await photoManager.getByOwner(req.user._id).lean();

//     res.render('profile', { photos, photoCount: photos.length });
// });



module.exports = router;