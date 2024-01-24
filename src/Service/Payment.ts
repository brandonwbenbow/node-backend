import Stripe from 'stripe';

export interface PaymentManagerConfig extends Stripe.StripeConfig {

}

export class PaymentManager {
    private Keys = {
        Server: process.env.NODE_ENV === 'prod' ? process.env.STRIPE_LIVE_KEY : process.env.STRIPE_TEST_KEY,
        Client: process.env.NODE_ENV === 'prod' ? process.env.STRIPE_PUBLIC_LIVE_KEY : process.env.STRIPE_PUBLIC_TEST_KEY
    }

    private config: PaymentManagerConfig | undefined;
    private handler: Stripe | undefined;

    constructor(config?: PaymentManagerConfig) {
        this.config = config;
        if(typeof(this.Keys.Server) === 'string')
            this.handler = new Stripe(this.Keys.Server, config);
    }

    async createCustomer(email: string) {
        return await this.handler?.customers.create({ email });
    }
}