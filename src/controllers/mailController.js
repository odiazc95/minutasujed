const express = require('express');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const router = express.Router();

router.post('/send_email', async (req, res, next) => {
    
    const clientId = '526696534772-2ffaqqet32dss25g6bl7mku4cdauciuj.apps.googleusercontent.com';
    const clientSecret = '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';
    const redirectUri = 'https://developers.google.com/oauthplayground';
    const refreshToken = '1//04UDNDe8u5KgLCgYIARAAGAQSNwF-L9IrePw75MR4SJN-w4vXSv7j5ALHOfA1w_b0EtfWHERylLnNsrH3qguu5YoOEJk_2HKl57w';
    
    const { subject, date, time, guests } = req.body;
    console.log(req.body)

    const OAuth2Client = new google.auth.OAuth2(
        clientId, clientSecret, redirectUri
    );

    OAuth2Client.setCredentials({ refresh_token: refreshToken });

    async function sendMail(subject, date, time, guests) {
        try {
            if (!guests || !Array.isArray(guests) || guests.length === 0) {
                throw new Error('Invalid guests data');
              }
            const accessToken = await OAuth2Client.getAccessToken()
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: 'martinez.daniel.isw@unipolidgo.edu.mx',
                    clientId: clientId,
                    clientSecret: clientSecret,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                },
            });
            for (const guest of guests) {
                const user = await User.findOne({ email: guest});
                const name = user.nombre;
                const last_name_p = user.apellido_paterno;
                const last_name_m = user.apellido_materno;

                const mailOptions = {
                    from: 'martinez.daniel.isw@unipolidgo.edu.mx',
                    to: guest,
                    subject: subject,
                    html: `
                        <html>
                            <head>
                                <style>
                                    .container{
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                    }
                                    .logo_email{
                                        width: 100%;
                                        height: 200px;
                                    }
                                    .logo_email img{
                                        width: 100%;
                                        height: 100%;
                                    }
                                    .guest_name{
                                        font-size: 20px;
                                    }
                                    .div_information{
                                        font-size: 18px;
                                        text-align: center;
                                    }
                                    .container_information{
                                        margin-top: 20px;
                                    }
                                    .confirm_button{
                                        margin-top: 20px;
                                        padding: 10px 20px;
                                        border-radius: 5px;
                                        border: none;
                                        background-color: #4CAF50;
                                        color: white;
                                        font-size: 20px;
                                        cursor:pointer;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class ="container">
                                    <div class="logo_email">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Logo_de_la_Universidad_Ju%C3%A1rez_del_Estado_de_Durango.svg" alt="Logo - Universidad Juarez del Estado de Durango">
                                    </div>
                                    <div class="guest_name">
                                        <p>Estimad@ invitad@: </p><span>${name} ${last_name_p} ${last_name_m}</span>
                                    </div>
                                    <div class="div_information">
                                        Se le envia la siguiente invitacion para realizar la firma de la minuta <span>${subject}</span> que se realizo el dia <span>${date}</span> a las <span>${time}</span>.<br><br>

                                        Si estas de acuerdo con los datos anteriormente mencionados, dale clic al siguiente boton para firmar digitalmente el documento pdf.
                                    </div>
                                    <div class="container_information">
                                        <h2>#SomosUJED</h2>
                                    </div>
                                    <button type="button" class="confirm_button" onclick="confirmSignature()">Firmar pdf digital</button>
                                </div>
                            </body>
                        </html>
                    `,
                };
                const result = await transporter.sendMail(mailOptions);
                console.log('Correo enviado correctamente a:', guest);
            }
            console.log('Email enviado correctamente');
            res.status(200).send('Email enviado correctamente');
          } catch (err) {
            console.error(err);
            res.status(500).send('Error al enviar el correo electrónico');
          }
        }
      
        sendMail(subject, date, time, guests);

});

module.exports = router;



/*
router.post('/send_email', (req, res, next) => {
    
    const clientId = '526696534772-2ffaqqet32dss25g6bl7mku4cdauciuj.apps.googleusercontent.com';
    const clientSecret = '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';
    const redirectUri = 'https://developers.google.com/oauthplayground';
    const refreshToken = '1//04UDNDe8u5KgLCgYIARAAGAQSNwF-L9IrePw75MR4SJN-w4vXSv7j5ALHOfA1w_b0EtfWHERylLnNsrH3qguu5YoOEJk_2HKl57w';
    
    const OAuth2Client = new google.auth.OAuth2(
        clientId, clientSecret, redirectUri
    );

    OAuth2Client.setCredentials({ refresh_token: refreshToken });

    async function sendMail(){
        try{
            const accessToken = await OAuth2Client.getAccessToken()
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: 'martinez.daniel.isw@unipolidgo.edu.mx',
                    clientId: clientId,
                    clientSecret: clientSecret,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                },
            });
            const mailOptions = {
                from: 'Prueba de correo por gmail <oscar.diaz@unipolidgo.edu.mx>',
                to: 'martinez.daniel.isw@unipolidgo.edu.mx',
                subject: 'UJED',
            };
            const result = transporter.sendMail(mailOptions);
            return result;

        }catch(err){
            console.error(err);
            return res.status(500).send('Error al enviar el correo electrónico');
        }
    }
    sendMail()
        .then((result)=>res.status(200).send('Email enviado'))
        .catch((error)=>console.log(error.message));
});





*/

