const router = require('express').Router();
const courseManager = require('../managers/courseManager');

router.get ('/', async (req, res) => {
    const courses = await courseManager.getAll().lean();

    res.render('home' , { courses });
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', async (req, res) => {
    const user = await courseManager.getUser(req.user?._id).lean();

    const createdCoursesCount = user.createdCourses.length;
    const signCoursesCount = user.signedUpCourses.length;

    
        res.render('profile', {user, createdCoursesCount, signCoursesCount} );

});

module.exports = router;