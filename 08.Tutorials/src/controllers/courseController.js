const router = require('express').Router();

const courseManager = require('../managers/courseManager');
const { getErrorMessage } = require('../utils/errorHelpers');

// router.get('/', async (req, res) => {
//     const photos = await photoManager.getAll().lean();

//     res.render('photos/catalog', { photos });
// });

router.get('/create', (req, res) => {
    res.render('courses/create');
});

router.post('/create', async (req, res) => {
    const courseData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await courseManager.create(courseData);
        res.redirect('/');

        } catch (error) {
            res.render('courses/create', {error: getErrorMessage(error)});
        }

});

router.get('/:courseId/details', async (req, res) => {
    const courseId = req.params.courseId;

    const course = await courseManager.getOne(courseId).lean();

    const isOwner = req.user?._id == course.owner._id;

    const isCourse = course.usersEnrolled.find((x) => x.user == req.user?._id);
    let isTrue = false;

    console.log(isCourse);

    if (isCourse !== undefined) {
        isTrue = true;
    }

        try {
        res.render ('courses/details', { course, isOwner, isTrue });

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful course' });
    }
});

router.get('/:courseId/course', async (req, res) => {

    const courseId = req.params.courseId;
    const user = req.user._id;


    try {
        await courseManager.addCourse(courseId, { user } );

        res.redirect(`/course/${courseId}/details`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`, { error: 'Unsuccessful course' });
    }
});

router.get('/:courseId/delete', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        await courseManager.delete(courseId);
    
        res.redirect('/');
    } catch (error) {
        res.render(`/courses/${courseId}/details`, { error: 'Unsuccessful course deletion' });
    }

});

router.get('/:courseId/edit', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await courseManager.getOne(courseId).lean();
    
        res.render('courses/edit', { course });
    } catch (error) {
        res.render(`courses/edit`, { error: 'Unsuccessful course edit' });
    }

});

router.post('/:courseId/edit', async (req, res) => {
    const courseId = req.params.courseId;
    const courseData = req.body;

    try {
        await courseManager.edit(courseId, courseData);
    
        res.redirect(`/courses/${courseId}/details`);
    } catch (error) {
        res.render(`courses/edit`, { error: 'Unsuccessful course edit', ...courseData });
    }
});



module.exports = router;