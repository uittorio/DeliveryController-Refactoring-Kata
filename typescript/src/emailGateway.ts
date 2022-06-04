import nodemailer from "nodemailer";
import { EmailService } from './deliveryController.spec';


export class EmailGateway implements EmailService {
    #transport: nodemailer.Transporter

    constructor() {
        this.#transport = nodemailer.createTransport({
                host: 'localhost',
                port: 25,
                secure: false,
                logger: true
        } );

    }

    public async send(address: string, subject: string, message: string) {
        return this.#transport.sendMail({
            subject,
            to: address,
            text: message
        })
    }
}
