const express = require('express');
const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
    const {nombre, apellido_p, apellido_m, matricula, rfc, email, password} = req.body;
    const user = new userSchema({
        nombre: nombre,
        apellido_p: apellido_p,
        apellido_m: apellido_m,
        matricula: matricula,
        rfc: rfc, 
        email: email,
        password: password
        //token_public: token_public
    });
    //user.rfc = await user.encryptRfc(user.rfc);//Cifrar
    user.password = await user.encryptPassword(user.password);
    await user.save();
    console.log(user);
    /*
    const secret_key = rfc;

    const token = jwt.sign({id: user._id}, secret_key, {
        expiresIn: 3 * 365 * 24 * 60 * 60 
    });//El metodo sign permite crear un token, puede recibir un id o el payload 

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(hashedToken);

    user.token_public = hashedToken;
    await user.save();
    console.log(user);

    //res.json('TOKEN HDPT');
    res.json({auth: true, token});*/
});

router.get('/navigation_auth', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token){
        return res.status(401).json({
            auth: false,
            message: 'No tienes acceso para iniciar al sistema: Missing token'
        });
    }
    const secret_key = req.body.rfc;

    const decoded = jwt.verify(token, secret_key);
    console.log(decoded);
    
    const user = await userSchema.findById(decoded.id, {password: 0});//Con password: 0 - no devuelve el password
    if (!user){
        return res.status(404).send('No se encontro el usuario');
    }
    res.json(user);
});

router.post('/signin', async (req, res, next) => {
    const {matricula, rfc} = req.body;
    console.log(matricula, rfc);
    //const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
    const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
    if (!user || !validateRfc(rfc)) {
        return res.status(401).json({auth: false, token: null});
    }

    const rfc_valid = validateRfc(rfc);
    console.log(rfc_valid);
    
    if (!rfc_valid) {
        return res.status(401).json({auth: false, token: null});
    }

    const secret_key = rfc;
    const token = jwt.sign({ id: user._id }, secret_key, {
        expiresIn: 3 * 365 * 24 * 60 * 60
    });
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(hashedToken);

    //res.json({ auth: true, token });

    //SI TODO ES CORRECTO DEVUELVE UN TOKEN
    //res.json("Iniciar sesion");
});

function validateRfc(rfc) {
    const rfcRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
    if (!rfcRegex.test(rfc)) {
      return false;
    }
    return true;
}
/*
router.get('/dashboard', (req, res, next) => {
    res.json('sss');
});*/


router.post('/dashboard', async (req, res, next) => {
  const {matricula, rfc} = req.body;
  console.log(matricula, rfc);
  //const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
  
  const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
  if (!user || !validateRfc(rfc)) {
      return res.status(401).json({auth: false, token: null});
  }
  const rfc_valid = validateRfc(rfc);
  console.log(rfc_valid);
  
  if (!rfc_valid) {
      return res.status(401).json({auth: false, token: null});
  }

  const secret_key = rfc;
  const token = jwt.sign({ id: user._id }, secret_key, {
      expiresIn: 3 * 365 * 24 * 60 * 60
  });
  
  //CARPETA TEMPORAL

  const tempFolderPath = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath);
  }

  // Guardar el token en un archivo JSON dentro de la carpeta temporal
  const tokenFilePath = path.join(tempFolderPath, 'token.json');
  fs.writeFileSync(tokenFilePath, JSON.stringify({ token }));

  // Responder con el token
  console.log(token);
  res.json({ auth: true, token });



  
  //ESTE CODIGO SIRVE
  /*const {matricula, rfc} = req.body;
  console.log(matricula, rfc);
  //const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
  
  const user = await userSchema.findOne({matricula: matricula, rfc: rfc});
  if (!user || !validateRfc(rfc)) {
      return res.status(401).json({auth: false, token: null});
  }
  const rfc_valid = validateRfc(rfc);
  console.log(rfc_valid);
  
  if (!rfc_valid) {
      return res.status(401).json({auth: false, token: null});
  }

  const secret_key = rfc;
  const token = jwt.sign({ id: user._id }, secret_key, {
      expiresIn: 3 * 365 * 24 * 60 * 60
  });
  console.log(token);
  //res.json({ auth: true, token });*/
  

});
function validateRfc(rfc) {
  const rfcRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
  if (!rfcRegex.test(rfc)) {
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
      'Content-Disposition': 'inline', // Muestra el PDF en línea sin descargarlo
      'X-Robots-Tag': 'noindex, nofollow', // Evita que los motores de búsqueda indexen el PDF
      'Cache-Control': 'private, no-store, no-cache, must-revalidate, proxy-revalidate', // Deshabilita el almacenamiento en caché
      'Pragma': 'no-cache', // Evita el almacenamiento en caché en versiones antiguas de HTTP
      'Expires': '0', // Caduca inmediatamente
    };
  
    if (range) {
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

/*const express = require('express');
const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    //res.send('Registrarse');
    //const { rfc, matricula } = req.body;
    const {nombre, apellido_p, apellido_m, matricula, rfc, email, password} = req.body;
    //console.log(rfc, matricula);
    //userSchema.create
    const user = new userSchema({
        nombre: nombre,
        apellido_p: apellido_p,
        apellido_m: apellido_m,
        matricula: matricula,
        rfc: rfc, 
        email: email,
        password: password
    });
    //user.rfc = await user.encryptRfc(user.rfc);//Cifrar
    user.password = await user.encryptPassword(user.password);
    await user.save();
    console.log(user);
    //res.json({message: 'Registrado'})
    const secret_key = rfc;

    const token = jwt.sign({id: user._id}, secret_key, {expiresIn: 24 * 60 * 60});//El metodo sign permite crear un token, puede recibir un id o el payload 
    res.json({auth: true, token});
});

router.get('/navigator', async (req, res, next) => {
    //res.json('Iniciar sesion')
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No tienes acceso para iniciar al sistema: Missing token'
        });
    }
    const secret_key = req.body.rfc;

    const decoded = jwt.verify(token, secret_key);
    //console.log(decoded);
    //const user = await userSchema.findById(decoded.id);
    const user = await userSchema.findById(decoded.id, {password: 0});//Con password: 0 - no devuelve el password
    if (!user){
        return res.status(404).send('No se encontro el usuario');
    }
    res.json(user);
    //res.json('Si');
});

router.post('/signin', async (req, res, next) => {
    //res.json('Iniciar sesion');
    const {matricula, rfc} = req.body;
    //console.log(matricula, rfc);
    const user = await userSchema.findOne({matricula: matricula});
    if(!user){
        return res.status(404).send('La matricula no existe');
    }

    const rfcValid = await user.validateRfc(rfc);

    console.log(rfcValid);

    res.json('Iniciaste sesion');
});

router.get('/dashboard', (req, res, next) => {
    res.json('Vista principal');
});

module.exports = router;*/





// Ruta de crear usuario
/*
router.post('/users', (req, res) => {
    //res.send('Esta es la ruta de crear usuario');
    const user = userSchema(req.body);//Esto crea un nuevo usuario desde el cuerpo de la peticion
    console.log(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));//Guarda el usuario en la base de datos save
});

//Obtener todos los usuarios

router.get('/users', (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener un usuario

router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Actualizar usuario

router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: { name, email }})//Se pasa el id del usuario en especifico
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar usuario

router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;*/
