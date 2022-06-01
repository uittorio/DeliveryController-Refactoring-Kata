import { DeliveryController } from './deliveryController';
import * as EmailGatewayDefault from './emailGateway';

describe('When updating a delivery', () => {
    it('should send an email', () => {
        const deliveryController = new DeliveryController([])
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
        deliveryController.updateDelivery();

        expect(emailSent).toBe(1);
    });
});
