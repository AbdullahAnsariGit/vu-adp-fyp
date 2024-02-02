const nodemailer = require("nodemailer");

const sendEmail = async (name ,email, subject, random) => {
    
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,//587
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });
     
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html:`
            <h1>Hi ${name},</h1>
            <h2>OTP for ${subject}:</h2>
            <h3 style="color: green;"> your otp is ${random}</h3>           
            `
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log( "email not sent",error);
    }
};

module.exports = sendEmail;






