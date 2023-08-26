import nodemailer from "nodemailer";
import { resolve } from 'path';
import fs from "fs";
import Handlebars from 'handlebars';

class MailService {
    constructor() {
        this.smtp_config = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_KEY
            },
            secure: false
        };
    }

    async send(templateFile, data, to, subject) {
        const transporter = nodemailer.createTransport(this.smtp_config);

        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const html = template(data);

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: to,
            subject: subject,
            html
        };

        await transporter.sendMail(mailOptions);
    }
}

export default MailService;