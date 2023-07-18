const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

async function iniciar(){
    await app.listen();

    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log('Servidor funcionando en el puerto', port));

    mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Conectado a la base de datos en MongoDB Atlas')).catch((error) => console.error(error));
    
    if(process.env.NODE_ENV === 'production') {
        console.log('Modo de produccion: Activo');
    } else {
       console.log('Modo de produccion: Inactivo')
    }
}
iniciar();