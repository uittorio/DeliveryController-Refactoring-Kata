import { EmailService } from '../src/emailService';

export class FakeEmailService implements EmailService {
    emailSent: number = 0;

    async send() {
        this.emailSent++;
    }
}
