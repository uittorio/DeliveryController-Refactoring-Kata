import { EmailService } from '../src/deliveryController.spec';

export class FakeEmailGateway implements EmailService {
    emailSent: number = 0;

    async send() {
        this.emailSent++;
    }
}
