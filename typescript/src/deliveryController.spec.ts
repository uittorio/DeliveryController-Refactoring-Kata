import { DeliveryController } from './deliveryController';

let emailSent = 0;

jest.mock('./emailGateway', () => {
    return {
        EmailGateway: jest.fn().mockImplementation(() => {
            return {
                send: () => {
                    emailSent++;
                },
            };
        })
    };
});


describe('When updating an existing delivery', () => {
    it('should send an email to the contact email', () => {
        const deliveryController = new DeliveryController([{
            id: 'delivery-id',
            arrived: false,
            contactEmail: 'vittorio.gue@gmail.com',
            timeOfDelivery: new Date(),
            location: {
                latitude: 123,
                longitude: 1234
            },
            onTime: false
        }])


        deliveryController.updateDelivery({
            id: "delivery-id",
            timeOfDelivery: new Date(),
            location: {
                latitude: 123,
                longitude: 1234
            }
        });


        expect(emailSent).toBe(1);
    });
});
