export const subscriptionConfig = {
    standardSubscriptionConfig: {
        price: 0.19,
        requestLimit: {
            airlake: 10000,
            evolake: 10,
            frostlake: 1000,
            icelake: 10,
            snowlake: 40
        }
    },
    premiumSubscriptionConfig: {
        price: 0.49,
        requestLimit: {
            airlake: 30000,
            evolake: 30,
            frostlake: 4000,
            icelake: 30,
            snowlake: 100
        }
    }
}