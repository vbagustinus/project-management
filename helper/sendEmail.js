function sendEmail(){
  const nodemailer = require('nodemailer')
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: 'testemailajah@gmail.com',
          pass: 'testemail12345'
      }
  });
  let mailOptions = {
      from: 'testemaiajah@gmail.com',
      to: 'albiardtya@gmail.com, vbagustinus@gmail.com',
      subject: 'Deadline',
      text: 'Nih pesan BUAT loe!'
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log('Waduh', error.message);
      }
      console.log('Pesan Terkirim');
  });
}
module.exports = sendEmail;