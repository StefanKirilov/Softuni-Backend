const router = require('express').Router();

const cryptoManager = require('../managers/cryptoManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const cryptos = await cryptoManager.getAll().lean();

    res.render('cryptos/catalog', { cryptos });
});

router.get('/create', (req, res) => {
    res.render('cryptos/create');
});

router.post('/create', async (req, res) => {
    const cryptoData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await cryptoManager.create(cryptoData);
        res.redirect('/cryptos');

        } catch (error) {
            res.render('cryptos/create', {error: getErrorMessage(error)});
        }

});

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    const crypto = await cryptoManager.getOne(cryptoId).lean();

    const isOwner = req.user?._id == crypto.owner._id;

    const isBuyGame = crypto.buy.find((x) => x.user == req.user?._id);
    let isBuy = false;

    if (isBuyGame !== undefined) {
        isBuy = true;
    }
        try {
        res.render ('cryptos/details', { crypto, isOwner, isBuy });

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful buy' });
    }
});

router.get('/:cryptoId/buy', async (req, res) => {

    const cryptoId = req.params.cryptoId;
    const user = req.user._id;

    try {

        await cryptoManager.buyGame(cryptoId, { user } );

        res.redirect(`/cryptos/${cryptoId}/details`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`, { error: 'Unsuccessful buy' });
    }
});

router.get('/:cryptoId/delete', async (req, res) => {
    try {
        const cryptoId = req.params.cryptoId;
        await cryptoManager.delete(cryptoId);
    
        res.redirect('/cryptos');
    } catch (error) {
        res.render(`/cryptos/${cryptoId}/details`, { error: 'Unsuccessful crypto' });
    }

});

router.get('/:cryptoId/edit', async (req, res) => {
    try {
        const cryptoId = req.params.cryptoId;
        const crypto = await cryptoManager.getOne(cryptoId).lean();
    
        res.render('cryptos/edit', { crypto });
    } catch (error) {
        res.render(`cryptos/edit`, { error: 'Unsuccessful crypto edit' });
    }

});

router.post('/:cryptoId/edit', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const  cryptoData = req.body;

    try {
        await cryptoManager.edit(cryptoId, cryptoData);
    
        res.redirect(`/cryptos/${cryptoId}/details`);
    } catch (error) {
        res.render(`cryptos/edit`, { error: 'Unsuccessful crypto edit', ...cryptoData });
    }
});

// router.post('/:photoId/comments', async (req, res) => {
//     const photoId = req.params.photoId;
//     const { comment } = req.body;
//     const user = req.user._id;

//     try {
//         await photoManager.addComment(photoId, { user , comment});
    
//         res.redirect(`/photos/${photoId}/details`);
//     } catch (error) {
//         res.redirect(`/`, { error: 'Unsuccessful comment' });
//     }
// });


module.exports = router;