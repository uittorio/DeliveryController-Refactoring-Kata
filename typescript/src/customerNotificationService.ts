export interface Customer {
    email: string;
    number: string;
}

export interface CustomerNotificationService {
    send(customer: Customer, subject: string, message: string): Promise<void>
}
