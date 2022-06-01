import { DeliveryController } from './deliveryController';
import * as EmailGatewayDefault from './emailGateway';

describe('When updating an existing delivery', () => {
    it('should send an email', () => {
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
        const constructorSpy = jest.spyOn(EmailGatewayDefault, 'EmailGateway');

        let emailSent = 0;
        // @ts-ignore
        constructorSpy.mockImplementation(() => {
            return {
                send: () => {
                    emailSent++;
                },
            }
            }
        )

        // @ts-ignore
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
