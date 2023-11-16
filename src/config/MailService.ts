import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
// @ts-ignore
module.exports.sendingMail = async({from, to, subject, text}): Promise<> =>{
    try {
        let mailOptions = ({
            from,
            to,
            subject,
            text
        })
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASS,
            },
        });
        return await Transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }

}