import { DeliveryController } from './deliveryController';
import * as EmailGatewayDefault from './emailGateway';

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
        const constructorSpy = jest.spyOn(EmailGatewayDefault, 'EmailGateway');

        let emailSent: {to: string};

        // @ts-ignore
        constructorSpy.mockImplementation(() => {
            return {
                send: (toEmail: string, _message: string) => {
                    emailSent = {
                        to: toEmail,
                    };
                }
            }
            }
        )

        deliveryController.updateDelivery({
            id: "delivery-id",
            timeOfDelivery: new Date(),
            location: {
                latitude: 123,
                longitude: 1234
            }
        });

        expect(emailSent).toBe({
            to: "vittorio.gue@gmail.com",
        });
    });
});
