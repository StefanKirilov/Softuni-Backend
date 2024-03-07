const router = require('express').Router();
const { TOKEN_KEY } = require('../config/config');

const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body; 

    try {
        const token = await userManager.login(email, password);
        res.cookie(TOKEN_KEY, token);
        res.redirect('/');
        } catch (error) {
            res.render('users/login', { error: getErrorMessage(error) })
        }

});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email , password, repeatPassword } = req.body; 

    try {
    const token = await userManager.register({ firstName, lastName, email , password, repeatPassword });
   
    res.cookie(TOKEN_KEY, token);
    res.redirect('/');

    } catch (error) {
        console.log(error);
        res.render('users/register', { error: getErrorMessage(error) })
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY);

    res.redirect('/');
});


module.exports = router;