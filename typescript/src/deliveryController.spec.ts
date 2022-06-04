import { Delivery, DeliveryController, DeliveryEvent } from './deliveryController';
import { FakeEmailService } from '../fake/fakeEmailService';
import { FakeSmsService } from '../fake/fakeSmsService';

describe('When the customer want to receive updates by email', () => {
    describe('When an existing delivery is updated', () => {
        it('should send an email to the contact email', () => {
            const delivery: Delivery = createDelivery({
                id: 'existing-delivery-for-vittorio',
                contactEmail: 'vittorio.gue@gmail.com'
            });
            const fakeEmailService = new FakeEmailService();
            new DeliveryController([delivery], fakeEmailService).updateDelivery(createDeliveryEvent({
                id: 'existing-delivery-for-vittorio',
            }))

            expect(fakeEmailService.emailsSent).toStrictEqual([{
                contactEmail: 'vittorio.gue@gmail.com',
                subject: "Your feedback is important to us"
            }]);
        });
    });
    describe('When a non existing delivery is updated', () => {
        it('should not send an email', () => {
            const delivery: Delivery = createDelivery({
                id: 'existing-delivery-for-vittorio',
            });

            const fakeEmailService = new FakeEmailService();
            new DeliveryController([delivery], fakeEmailService).updateDelivery(createDeliveryEvent({
                id: 'unknown-delivery',
            }))

            expect(fakeEmailService.emailsSent).toEqual([])
        });
    });

    describe('When there is another delivery for a customer', () => {
        it('should send an email to notify the customer that the deliver will arrive soon', async () => {
            const delivery: Delivery = createDelivery(createDelivery({
                id: 'existing-delivery-for-vittorio',
                contactEmail: 'vittorio.gue@gmail.com',
            }));

            const anotherDelivery: Delivery = createDelivery({
                id: 'another-delivery-for-vittorio',
                contactEmail: 'vittorio.gue@gmail.com',
            });
            const fakeEmailService = new FakeEmailService()

            const deliveryController = new DeliveryController([delivery, anotherDelivery], fakeEmailService);

            await deliveryController.updateDelivery(createDeliveryEvent())

            expect(fakeEmailService.emailsSent.length).toBe(2);
            expect(fakeEmailService.emailsSent).toStrictEqual([{
                contactEmail: 'vittorio.gue@gmail.com',
                subject: "Your feedback is important to us"
            }, {
                contactEmail: 'vittorio.gue@gmail.com',
                subject: "Your delivery will arrive soon."
            }])
        });
    });
});

describe('When the customer wants to receive updates by sms', () => {
    describe('When an existing delivery is updated', () => {
        it('should send an email to the customer phone number', () => {
            const delivery = createDelivery();
            createDelivery({
                id: 'existing-delivery-for-vittorio',
                contactPhoneNumber: '07777777777',
                contactEmail: 'vittorio.gue@gmail.com',
            })
            const fakeSmsService = new FakeSmsService();
            new DeliveryController([delivery], fakeSmsService).updateDelivery(createDeliveryEvent({
                id: 'existing-delivery-for-vittorio',
            }))

            expect(fakeSmsService.smsSent).toStrictEqual({
                contactNumber: '07777777777'
            });
        });
    });
});

function createDeliveryEvent(deliveryEvent?: Partial<DeliveryEvent>): DeliveryEvent {
    return {
        id: 'existing-delivery-for-vittorio',
        location: {
            latitude: 120,
            longitude: 250
        },
        timeOfDelivery: new Date(),
        ...deliveryEvent
    };
}

function createDelivery(delivery?: Partial<Delivery>): Delivery {
    return {
        arrived: false,
        contactEmail: 'vittorio.gue@gmail.com',
        contactPhoneNumber: '07777777777',
        id: 'existing-delivery-for-vittorio',
        location: {
            latitude: 120,
            longitude: 200
        },
        onTime: false,
        timeOfDelivery: new Date(),
        ...delivery
    };
}
