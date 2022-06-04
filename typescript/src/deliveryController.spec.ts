import { Delivery, DeliveryController } from './deliveryController';
import { FakeEmailService } from '../fake/fakeEmailService';
import { FakeSmsService } from '../fake/fakeSmsService';

describe('When the customer want to receive updates by email', () => {
    describe('When an existing delivery is updated', () => {
        it('should send an email to the contact email', () => {
            const delivery: Delivery = {
                arrived: false,
                contactEmail: 'vittorio.gue@gmail.com',
                id: 'existing-delivery-for-vittorio',
                location: undefined,
                onTime: false,
                timeOfDelivery: new Date()
            }
            const fakeEmailService = new FakeEmailService();
            new DeliveryController([delivery], fakeEmailService).updateDelivery({
                id: 'existing-delivery-for-vittorio',
                location: {
                    latitude: 120,
                    longitude: 250
                },
                timeOfDelivery: new Date()
            })

            expect(fakeEmailService.emailSent).toStrictEqual({
                contactEmail: 'vittorio.gue@gmail.com'
            });
        });
    });

    describe('When a non existing delivery is updated', () => {
        it('should not send an email', () => {
            const delivery: Delivery = {
                arrived: false,
                contactEmail: 'vittorio.gue@gmail.com',
                id: 'unknown-delivery',
                location: undefined,
                onTime: false,
                timeOfDelivery: new Date()
            }

            const fakeEmailService = new FakeEmailService();
            new DeliveryController([delivery], fakeEmailService).updateDelivery({
                id: 'existing-delivery-for-vittorio',
                location: {
                    latitude: 120,
                    longitude: 250
                },
                timeOfDelivery: new Date()
            })

            expect(fakeEmailService.emailSent).toBeUndefined()
        });
    });
});

describe('When the customer wants to receive updates by sms', () => {
    describe('When an existing delivery is updated', () => {
        it('should send an email to the customer phone number', () => {
            const delivery: Delivery = {
                arrived: false,
                contactEmail: 'vittorio.gue@gmail.com',
                contactPhoneNumber: '07777777777',
                id: 'existing-delivery-for-vittorio',
                location: undefined,
                onTime: false,
                timeOfDelivery: new Date()
            }
            const fakeSmsService = new FakeSmsService();
            new DeliveryController([delivery], fakeSmsService).updateDelivery({
                id: 'existing-delivery-for-vittorio',
                location: {
                    latitude: 120,
                    longitude: 250
                },
                timeOfDelivery: new Date()
            })

            expect(fakeSmsService.smsSent).toStrictEqual({
                contactNumber: '07777777777'
            });
        });
    });
});
