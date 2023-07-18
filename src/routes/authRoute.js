const express = require('express');
//const userSchema = require('../models/user');
const router = express.Router();

//CUANDO ESTEN LISTAS LAS VALIDACIONES DE AUTHCONTROLLER, DESCOMENTAR EL SIGUIENTE MENSAJE

router.get('/dashboard', (req, res, next) => {
    res.render('dashboard'); // Renderizar la vista del dashboard
});

module.exports = router;
