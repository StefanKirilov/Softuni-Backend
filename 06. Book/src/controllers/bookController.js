const router = require('express').Router();

const bookManager = require('../managers/bookManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const books = await bookManager.getAll().lean();

    res.render('books/catalog', { books });
});

router.get('/create', (req, res) => {
    res.render('books/create');
});

router.post('/create', async (req, res) => {
    const bookData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await bookManager.create(bookData);
        res.redirect('/books');

        } catch (error) {
            res.render('books/create', {error: getErrorMessage(error)});
        }

});

// router.get('/:bookId/details', async (req, res) => {
//     const bookId = req.params.bookId;
//     const book = await bookManager.getOne(bookId).populate('wishingList.user').lean();
//     const isOwner = req.user?._id == book.owner._id;

//     res.render ('books/details', { book, isOwner });
// });

router.get('/:bookId/details', async (req, res) => {
    const bookId = req.params.bookId;

    const book = await bookManager.getOne(bookId).lean();

    const isOwner = req.user?._id == book.owner._id;

    const isWishBook = book.wishingList.find((x) => x.user == req.user?._id);
    let isWish = false;

    if (isWishBook !== undefined) {
        isWish = true;
    }

        try {
        res.render ('books/details', { book, isOwner, isWish });

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful buy' });
    }
});

router.get('/:bookId/wish', async (req, res) => {

    const bookId = req.params.bookId;
    const user = req.user._id;

    try {
        await bookManager.wishBook(bookId, { user } );

        res.redirect(`/books/${bookId}/details`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`, { error: 'Unsuccessful wish' });
    }
});

router.get('/:bookId/delete', async (req, res) => {
    try {
        const bookId = req.params.bookId;
        await bookManager.delete(bookId);
    
        res.redirect('/books');
    } catch (error) {
        res.render(`/books/${bookId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:bookId/edit', async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await bookManager.getOne(bookId).lean();
    
        res.render('books/edit', { book });
    } catch (error) {
        res.render(`books/edit`, { error: 'Unsuccessful book edit' });
    }

});

router.post('/:bookId/edit', async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;


    try {
        await bookManager.edit(bookId, bookData);
    
        res.redirect(`/books/${bookId}/details`);
    } catch (error) {
        res.render(`books/edit`, { error: 'Unsuccessful photo edit', ...bookData });
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