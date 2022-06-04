import { DeliveryController } from './deliveryController';

describe('When something happens', function () {
    it('should send an email', () => {

        const emailSent = 0;
        new DeliveryController([]).updateDelivery({
            id: 'delivery-event-id',
            location: {
                latitude: 120,
                longitude: 250
            },
            timeOfDelivery: new Date()
        })

        expect(emailSent).toBe(1)
    });
});
