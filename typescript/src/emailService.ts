export interface EmailService {
    send(address: string, subject: string, message: string): Promise<void>
}
