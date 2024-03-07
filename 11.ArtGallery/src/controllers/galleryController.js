const router = require('express').Router();

const galleryManager = require('../managers/galleryManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const pictures = await galleryManager.getAll().lean();

    res.render('gallery/gallery', { pictures });
});

router.get('/create', (req, res) => {
    res.render('gallery/create');
});

router.post('/create', async (req, res) => {
    const publicationData = {
        ...req.body,
        author: req.user._id,
    }; 

    try {
        await galleryManager.create(req.user._id, publicationData);
        res.redirect('/gallery');

        } catch (error) {
            res.render('gallery/create', { ...publicationData, error: getErrorMessage(error)});
        }

});

router.get('/:publicationId/details', async (req, res) => {
    const publicationId = req.params.publicationId;
    const publication = await galleryManager.getOne(publicationId).lean();
    const isOwner = req.user?._id == publication.author._id;
    const userShared = publication.usersShared.some((x) => x._id.toString() === req.user?._id);
    isShared = false;

    if (userShared) {
        isShared = true;
    }

    res.render ('gallery/details', { ...publication, isOwner, isShared });
});

router.get('/:publicationId/share', async (req, res) => {
    const publicationId = req.params.publicationId;
    const userId = req.user._id;

    try {
        await galleryManager.shared(publicationId, userId);

        res.redirect(`/gallery/${publicationId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful shared' });
    }
});

router.get('/:publicationId/delete', async (req, res) => {
    try {
        const publicationId = req.params.publicationId;
        await galleryManager.delete(publicationId);
    
        res.redirect('/gallery');
    } catch (error) {
        res.render(`/gallery/${publicationId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:publicationId/edit', async (req, res) => {
    try {
        const publicationId = req.params.publicationId;
        const publication = await galleryManager.getOne(publicationId).lean();
    
        res.render('gallery/edit', { ...publication });
    } catch (error) {
        res.render(`gallery/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:publicationId/edit', async (req, res) => {
    const publicationId = req.params.publicationId;
    const publicationData = req.body;

    try {
        await galleryManager.edit(publicationId, publicationData);
    
        res.redirect(`/gallery/${publicationId}/details`);
    } catch (error) {
        res.render(`gallery/edit`, { error: 'Unsuccessful photo edit', ...publicationData });
    }
});



module.exports = router;