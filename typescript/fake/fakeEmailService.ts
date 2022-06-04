import { EmailService } from '../src/deliveryController.spec';

export class FakeEmailService implements EmailService {
    emailSent: number = 0;

    async send() {
        this.emailSent++;
    }
}
