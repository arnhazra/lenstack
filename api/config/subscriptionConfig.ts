export const subscriptionConfig = {
    standardSubscriptionConfig: {
        price: 0.19,
        requestLimit: {
            evolake: 10,
            airlake: 300,
            icelake: 5,
            frostlake: 1000,
            snowlake: 40
        }
    },
    premiumSubscriptionConfig: {
        price: 0.49,
        requestLimit: {
            evolake: 30,
            airlake: 1000,
            icelake: 10,
            frostlake: 5000,
            snowlake: 100
        }
    }
}