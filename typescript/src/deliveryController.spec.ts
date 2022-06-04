import { Delivery, DeliveryController } from './deliveryController';


let emailSent = 0;


class FakeEmailGateway {
    send(){
        emailSent++;
    }
}

describe('When an existing delivery is updated',() => {
    it('should send an email', () => {
        emailSent = 0;
        const delivery: Delivery  = {
            arrived: false,
            contactEmail: 'vittorio.gue@gmail.com',
            id: 'existing-delivery-for-vittorio',
            location: undefined,
            onTime: false,
            timeOfDelivery: new Date()
        }
        // @ts-ignore
        new DeliveryController([delivery], new FakeEmailGateway()).updateDelivery({
            id: 'existing-delivery-for-vittorio',
            location: {
                latitude: 120,
                longitude: 250
            },
            timeOfDelivery: new Date()
        })

        expect(emailSent).toBe(1)
    });
});

describe('When a non existing delivery is updated', () => {
    it('should not send an email', () => {
        emailSent = 0;
        const delivery: Delivery  = {
            arrived: false,
            contactEmail: 'vittorio.gue@gmail.com',
            id: 'unknown-delivery',
            location: undefined,
            onTime: false,
            timeOfDelivery: new Date()
        }
        // @ts-ignore
        new DeliveryController([delivery, new FakeEmailGateway()]).updateDelivery({
            id: 'existing-delivery-for-vittorio',
            location: {
                latitude: 120,
                longitude: 250
            },
            timeOfDelivery: new Date()
        })

        expect(emailSent).toBe(0)
    });
});
