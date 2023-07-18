const express = require('express');
const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('login');
});

router.post('/signin', async (req, res) => {
    res.render('dashboard');
});


router.get('/dashboard', (req, res, next) => {
    res.render('dashboard');
});

module.exports = router;