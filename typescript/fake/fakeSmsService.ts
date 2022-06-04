import { Customer, CustomerNotificationService } from '../src/customerNotificationService';

export class FakeSmsService implements CustomerNotificationService {
    smsSent: { contactNumber: string};

    async send(customer: Customer, subject: string, message: string) {
        this.smsSent = {
            contactNumber: customer.number
        };
    }
}
