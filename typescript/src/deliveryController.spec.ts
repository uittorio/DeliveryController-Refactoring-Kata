import { Delivery, DeliveryController } from './deliveryController';
import { FakeEmailService } from '../fake/fakeEmailService';


describe('When an existing delivery is updated',() => {
    it('should send an email', () => {
        const delivery: Delivery  = {
            arrived: false,
            contactEmail: 'vittorio.gue@gmail.com',
            id: 'existing-delivery-for-vittorio',
            location: undefined,
            onTime: false,
            timeOfDelivery: new Date()
        }
        const fakeEmailGateway = new FakeEmailService();
        new DeliveryController([delivery], fakeEmailGateway).updateDelivery({
            id: 'existing-delivery-for-vittorio',
            location: {
                latitude: 120,
                longitude: 250
            },
            timeOfDelivery: new Date()
        })

        expect(fakeEmailGateway.emailSent).toBe(1)
    });
});

describe('When a non existing delivery is updated', () => {
    it('should not send an email', () => {
        const delivery: Delivery  = {
            arrived: false,
            contactEmail: 'vittorio.gue@gmail.com',
            id: 'unknown-delivery',
            location: undefined,
            onTime: false,
            timeOfDelivery: new Date()
        }

        const fakeEmailGateway = new FakeEmailService();
        new DeliveryController([delivery], fakeEmailGateway).updateDelivery({
            id: 'existing-delivery-for-vittorio',
            location: {
                latitude: 120,
                longitude: 250
            },
            timeOfDelivery: new Date()
        })

        expect(fakeEmailGateway.emailSent).toBe(0)
    });
});
