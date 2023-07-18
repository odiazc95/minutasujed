const express = require('express');
const userSchema = require('../models/usuario');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/signin', async (req, res, next) => {
    const {matricula, rfc} = req.body;
    console.log(matricula, rfc);

    const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
    if(!user || !validateRfc(rfc)){
        return res.status(401).json({auth: false, token: null});
    }

    const rfc_valid = validateRfc(rfc);
    console.log(rfc_valid);
    if(!rfc_valid){
        return res.status(401).json({auth: false, token: null});
    }

    res.redirect('/dashboard');
    //res.json({ auth: true, token });
});

router.get('/navigation_auth', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No tienes acceso para acceder al sistema: Missing token'
        });
    }
    const secret_key = req.body.rfc;
    const decoded = jwt.verify(token, secret_key);
    console.log(decoded);

    const user = await userSchema.findById(decoded.id, {password: 0});
    if(!user){
        return res.status(404).send('No se encontro el usuario');
    }
    res.json(user);
});

router.post('/dashboard', async (req, res, next) => {
    const {matricula, rfc} = req.body;
    console.log(matricula, rfc);

    const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
    if(!user || !validateRfc(rfc)){
        return res.status(401).json({auth: false, token: null});
    }

    const rfc_valid = validateRfc(rfc);
    console.log(rfc_valid);
    if(!rfc_valid){
        return res.status(401).json({auth: false, token: null});
    }

    const secret_key = rfc;
    const token = jwt.sign({ id: user._id}, secret_key, {
        expiresIn: 3 * 365 * 24 * 60 * 60
    });

    const temp_folder = path.join(__dirname, 'temp');
    if(!fs.existsSync(temp_folder)){
        fs.mkdirSync(temp_folder);
    }

    const token_file = path.join(temp_folder, 'token.json');
    fs.writeFileSync(token_file, JSON.stringify({ token }));
    console.log(token);

    res.json({ auth: true, token });
});

function validateRfc(rfc){
    const rfcRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
    if(!rfcRegex.test(rfc)){
        return false;
    }
    return true;
}

router.get('/pdf', (req, res) => {
    const filePath = path.join(__dirname, 'pdf', 'archivo-19.pdf');
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'private, no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    };
  
    if(range){
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
  
      head['Content-Range'] = `bytes ${start}-${end}/${fileSize}`;
      head['Accept-Ranges'] = 'bytes';
      head['Content-Length'] = chunkSize;
  
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  });

module.exports = router;