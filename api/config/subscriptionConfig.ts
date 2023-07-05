export const subscriptionConfig = {
    standardSubscriptionConfig: {
        price: 0.19,
        requestLimit: {
            airlake: 10000,
            evolake: 20,
            frostlake: 1500,
            icelake: 20,
            snowlake: 400
        }
    },
    premiumSubscriptionConfig: {
        price: 0.49,
        requestLimit: {
            airlake: 30000,
            evolake: 60,
            frostlake: 5000,
            icelake: 50,
            snowlake: 1200
        }
    }
}