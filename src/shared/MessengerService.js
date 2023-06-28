import nodemailer from 'nodemailer'

class MessengerService{
    constructor(){
        this.user = process.env.SMTP_EMAIL,
        this.pass = process.env.SMTP_KEY
    }

    async sendMessage(payload){
        const transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth:{
                user: this.user,
                pass: this.pass
            }
        });

        await transport.sendMail(payload);
    }
}

export default MessengerService
