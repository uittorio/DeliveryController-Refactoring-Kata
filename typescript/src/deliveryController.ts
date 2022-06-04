import { Location, MapService } from './mapService';
import { CustomerNotificationService } from './customerNotificationService';

const TEN_MINUTES = 1000 * 60 * 10;

export interface Delivery {
    id: string
    contactEmail: string
    location: Location
    timeOfDelivery: Date
    arrived: boolean
    onTime: boolean
}

export interface DeliveryEvent {
    id: string
    timeOfDelivery: Date
    location: Location
}

export class DeliveryController {
    #emailService: CustomerNotificationService;
    #mapService: MapService;
    #deliveries: Array<Delivery>;

    constructor(deliveries: Array<Delivery>, emailService: CustomerNotificationService) {
        this.#deliveries = deliveries;
        this.#mapService = new MapService();
        this.#emailService = emailService;
    }

    public async updateDelivery(event: DeliveryEvent) {
        let nextDelivery: Delivery;

        for (let i = 0; i < this.#deliveries.length; i++) {
            const delivery = this.#deliveries[i];
            if (delivery.id === event.id) {
                delivery.arrived = true;
                var timeDifference = event.timeOfDelivery.getTime() - delivery.timeOfDelivery.getTime();
                if (timeDifference < TEN_MINUTES) {
                    delivery.onTime = true;
                }
                delivery.timeOfDelivery = event.timeOfDelivery;
                let message = `Regarding your delivery today at ${delivery.timeOfDelivery}. How likely would you be to recommend this delivery service to a friend? Click <a href='url'>here</a>`
                this.#emailService.send({ email: delivery.contactEmail }, "Your feedback is important to us", message)
                if (this.#deliveries.length > i + 1) {
                    nextDelivery = this.#deliveries[i + 1];
                }

                if (!delivery.onTime && this.#deliveries.length > 1 && i > 0) {
                    var previousDelivery = this.#deliveries[i - 1];
                    var elapsedTime = delivery.timeOfDelivery.getTime() - previousDelivery.timeOfDelivery.getTime();
                    this.#mapService.updateAverageSpeed(previousDelivery.location, delivery.location, elapsedTime);
                }
            }
        }

        if (nextDelivery !== undefined) {
            var nextEta = this.#mapService.calculateETA(event.location, nextDelivery.location);
            const message = `Your delivery to ${nextDelivery.location} is next, estimated time of arrival is in ${nextEta} minutes. Be ready!`
            await this.#emailService.send({ email: nextDelivery.contactEmail }, "Your delivery will arrive soon.", message);
        }
    }
}
