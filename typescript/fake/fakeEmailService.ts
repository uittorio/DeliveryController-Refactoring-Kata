import { Customer, CustomerNotificationService } from '../src/customerNotificationService';

export class FakeEmailService implements CustomerNotificationService {
    emailsSent: { contactEmail: string; subject?: string}[] = [];

    async send(customer: Customer, subject: string, message: string) {
        this.emailsSent.push({
            contactEmail: customer.email,
            subject
        });
    }
}
