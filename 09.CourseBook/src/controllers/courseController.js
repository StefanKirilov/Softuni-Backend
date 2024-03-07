const router = require('express').Router();

const courseManager = require('../managers/courseManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const courses = await courseManager.getAll().lean();

    res.render('courses/catalog', { courses });
});

router.get('/create', (req, res) => {
    res.render('courses/create');
});

router.post('/create', async (req, res) => {
    const courseData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await courseManager.create(req.user._id, courseData);
        res.redirect('/courses');

        } catch (error) {
            res.render('courses/create', { ...courseData, error: getErrorMessage(error)});
        }

});

router.get('/:courseId/details', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await courseManager.getOne(courseId).lean();
    const isOwner = req.user?._id == course.owner._id;
    const signUpUsers = course.signUpList.map((x) => x.username).join(', ');

    const isSignCourse = course.signUpList.find((x) => x._id == req.user?._id);
    let signLength = false;

    if (course.signUpList.length > 0) {
        signLength = true;
    }



    res.render ('courses/details', { course, isOwner, isSignCourse, signLength, signUpUsers });
});

router.get('/:courseId/sign', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    try {
        await courseManager.signUp(courseId, userId);

        res.redirect(`/courses/${courseId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful comment' });
    }
});

router.get('/:courseId/delete', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        await courseManager.delete(courseId);
    
        res.redirect('/courses');
    } catch (error) {
        res.render(`/courses/${courseId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:courseId/edit', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await courseManager.getOne(courseId).lean();
    
        res.render('courses/edit', { course });
    } catch (error) {
        res.render(`courses/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:courseId/edit', async (req, res) => {
    const courseId = req.params.courseId;
    const courseData = req.body;

    try {
        await courseManager.edit(courseId, courseData);
    
        res.redirect(`/courses/${courseId}/details`);
    } catch (error) {
        res.render(`courses/edit`, { error: 'Unsuccessful photo edit', ...courseData });
    }
});



module.exports = router;