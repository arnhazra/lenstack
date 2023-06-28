export const subscriptionConfig = {
    standardSubscriptionConfig: {
        price: 0.19,
        requestLimit: {
            airlake: 300,
            evolake: 10,
            frostlake: 1000,
            icelake: 10,
            snowlake: 40
        }
    },
    premiumSubscriptionConfig: {
        price: 0.49,
        requestLimit: {
            airlake: 1000,
            evolake: 30,
            frostlake: 5000,
            icelake: 20,
            snowlake: 100
        }
    }
}