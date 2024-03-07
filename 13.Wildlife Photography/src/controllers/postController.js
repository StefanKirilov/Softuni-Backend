const router = require('express').Router();

const postManager = require('../managers/postManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const posts = await postManager.getAll().lean();

    res.render('posts/posts', { posts });
});

router.get('/create', (req, res) => {
    res.render('posts/create');
});

router.post('/create', async (req, res) => {
    const postData = {
        ...req.body,
        author: req.user._id,
        rating: 0,
    }; 

    try {
        await postManager.create(req.user._id, postData);
        res.redirect('/posts');

        } catch (error) {
            res.render('posts/create', { ...postData, error: getErrorMessage(error)});
        }

});

router.get('/:postId/details', async (req, res) => {
    const postId = req.params.postId;
    const post = await postManager.getOne(postId).lean();
    const isOwner = req.user?._id == post.author._id;
    const userVote = post.votes.some((x) => x._id.toString() === req.user?._id);
    let fullName = (post.author.firstName + ' ' + post.author.lastName);
    let allVotedUser = post.votes.map((x) => x.email).join(', ');

    res.render ('posts/details', { ...post, isOwner, userVote, fullName, allVotedUser });
});

router.get('/:postId/voteUp', async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        await postManager.up(postId, userId);

        res.redirect(`/posts/${postId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful shared' });
    }
});

router.get('/:postId/voteDown', async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        await postManager.down(postId, userId);

        res.redirect(`/posts/${postId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful shared' });
    }
});

router.get('/:postId/delete', async (req, res) => {
    try {
        const postId = req.params.postId;
        await postManager.delete(postId);
    
        res.redirect('/posts');
    } catch (error) {
        res.render(`/posts/${postId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:postId/edit', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await postManager.getOne(postId).lean();
    
        res.render('posts/edit', { ...post });
    } catch (error) {
        res.render(`posts/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:postId/edit', async (req, res) => {
    const postId = req.params.postId;
    const postData = req.body;

    try {
        await postManager.edit(postId, postData);
    
        res.redirect(`/posts/${postId}/details`);
    } catch (error) {
        res.render(`posts/edit`, { error: 'Unsuccessful photo edit', ...postData });
    }
});

router.get('/myPosts', async (req, res) => {
    const user = await postManager.getUser(req.user?._id).lean();

    const myPosts = user.myPosts;

    let fullName = (user.firstName + ' ' + user.lastName);

    console.log(fullName);
    
        res.render(`posts/myPosts`, {myPosts, fullName});

});



module.exports = router;