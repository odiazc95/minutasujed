const express = require('express');
const router = express.Router();
const User = require('../models/user');

async function getEmails() {
  // Consulta tu base de datos para obtener la lista de correos electrónicos
  const users = await User.find();
  const emails = users.map(user => user.email);
  return emails;
}

router.get('/', async (req, res) => {
  const emails = await getEmails();
  res.render('mail.ejs', { emails });
});

router.get('/emails', async (req, res) => {
  const users = await User.find().select('email');
  const emails = users.map(user => user.email);
  res.json(emails);
});

//BORRAR ESTA CODIGO CUANDO YA TENGA EL DESIGN DEL CORREO GMAIL

router.get('/design', (req, res) => {
  res.render('design.ejs');
});
module.exports = router;

