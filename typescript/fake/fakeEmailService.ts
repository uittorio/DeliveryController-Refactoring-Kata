import { Customer, CustomerNotificationService } from '../src/customerNotificationService';

export class FakeEmailService implements CustomerNotificationService {
    emailSent: { contactEmail: string};

    async send(customer: Customer, subject: string, message: string) {
        this.emailSent = {
            contactEmail: customer.email
        };
    }
}
