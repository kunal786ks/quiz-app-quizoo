var nodemailer = require("nodemailer");
const sendMail = (receiver,otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ks445kunalsharma@gmail.com",
      pass: "pwew poyo zryo sigu",
    },
  });
  const html = `
    <html>
    <body>
        <p>Enter this otp get back to our account or update password : - ${otp}</p>
    </body>
    </html>
`;
  var mailOptions = {
    from: "ks445kunalsharma@gmail.com",
    to: receiver,
    subject: "Forgot password , Enter the otp to retrieve your account",
    html: html,
    attachments: [
      {
        filename: "textisg file",
        path: "./public/images/default.jpg",
      },
    ],
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports={sendMail}