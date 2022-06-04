import nodemailer from "nodemailer";
import { Customer, CustomerNotificationService } from './customerNotificationService';


export class EmailGateway implements CustomerNotificationService {
    #transport: nodemailer.Transporter

    constructor() {
        this.#transport = nodemailer.createTransport({
                host: 'localhost',
                port: 25,
                secure: false,
                logger: true
        } );

    }

    public async send(customer: Customer, subject: string, message: string) {
        return this.#transport.sendMail({
            subject,
            to: customer.email,
            text: message
        })
    }
}
