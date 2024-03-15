import { createTransport } from 'nodemailer';

export const enviarEmail = async ({ name, surname, asunto, mensaje, email, nameOwner, surnameOwner, toEmail, titulo }) => {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.usermail,
      pass: process.env.passwordmail
    }
  };

  console.log("PIAZZZAAAAAAAAAAA", name, surname, asunto, mensaje, email, nameOwner, surnameOwner, toEmail, titulo)
  const transporter = createTransport(config);

  const message = {
    from: process.env.usermail,
    to: toEmail,
    subject: 'Alguien quiere contactarse contigo',
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo Electrónico</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }

    h1 {
        background-color:  #FF4000;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        color: #ffffff;
    }

    p {
      color: #2c2c2c;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007BFF;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .subrayado {
        text-decoration: underline;
    }
    .negrita {
        font-weight: bold;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      color: #777777;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>¡Alguien quiere contactarse contigo!</h1>
    <h3 class="subrayado negrita">Estimado/a ${nameOwner} ${surnameOwner},</h3>
    <p class="negrita">${name} ${surname} vio tu publicacion <span class="negrita subrayado">${titulo}</span> y quiere contactarse contigo con el asunto:</p> 
    <p >${asunto}</p>
    <p class="negrita">Y le deja el siguiente mensaje: </p>
    <p>${mensaje}</p>
    <p>Remitente: ${email}</p>
  </div>
  
</body>
</html>

  `
  };

  return await transporter.sendMail(message);
}
