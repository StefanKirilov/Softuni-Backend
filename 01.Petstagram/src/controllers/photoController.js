const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean();

    res.render('photos/catalog', { photos });
});

router.get('/create', (req, res) => {
    res.render('photos/create');
});

router.post('/create', async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await photoManager.create(photoData);
        res.redirect('/photos');

        } catch (error) {
            res.render('photos/create', {error: getErrorMessage(error)});
        }

});

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId).populate('commentList.user').lean();
    const isOwner = req.user?._id == photo.owner._id;

    res.render ('photos/details', { photo, isOwner });
});

router.get('/:photoId/delete', async (req, res) => {
    try {
        const photoId = req.params.photoId;
        await photoManager.delete(photoId);
    
        res.redirect('/photos');
    } catch (error) {
        res.render(`/photos/${photoId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:photoId/edit', async (req, res) => {
    try {
        const photoId = req.params.photoId;
        const photo = await photoManager.getOne(photoId).lean();
    
        res.render('photos/edit', { photo });
    } catch (error) {
        res.render(`photos/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:photoId/edit', async (req, res) => {
    const photoId = req.params.photoId;
    const photoData = req.body;

    try {
        await photoManager.edit(photoId, photoData);
    
        res.redirect(`/photos/${photoId}/details`);
    } catch (error) {
        res.render(`photos/edit`, { error: 'Unsuccessful photo edit', ...photoData });
    }
});

router.post('/:photoId/comments', async (req, res) => {
    const photoId = req.params.photoId;
    const { comment } = req.body;
    const user = req.user._id;

    try {
        await photoManager.addComment(photoId, { user , comment});
    
        res.redirect(`/photos/${photoId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful comment' });
    }
});


module.exports = router;