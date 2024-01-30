import Stripe from 'stripe';

import { Service, ServiceConfig } from '../Type/Service';

export interface PaymentServiceConfig extends Stripe.StripeConfig, ServiceConfig {

}

export class PaymentService extends Service {
    private Keys = {
        Server: process.env.NODE_ENV === 'prod' ? process.env.STRIPE_LIVE_KEY : process.env.STRIPE_TEST_KEY,
        Client: process.env.NODE_ENV === 'prod' ? process.env.STRIPE_PUBLIC_LIVE_KEY : process.env.STRIPE_PUBLIC_TEST_KEY
    }

    private handler: Stripe | undefined;

    constructor(config?: PaymentServiceConfig) {
        super(config);
        if(typeof(this.Keys.Server) === 'string')
            this.handler = new Stripe(this.Keys.Server, config);
    }

    async Start() {
        
    }

    async createCustomer(email: string) {
        return await this.handler?.customers.create({ email });
    }
}