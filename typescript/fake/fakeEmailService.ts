import { EmailService } from '../src/emailService';

export class FakeEmailService implements EmailService {
    emailSent: { contactEmail: string};

    async send(address: string, subject: string, message: string) {
        this.emailSent = {
            contactEmail: address
        };
    }
}
