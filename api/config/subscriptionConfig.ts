export const subscriptionConfig = {
    standardSubscriptionConfig: {
        price: 0,
        requestLimit: {
            evolake: 2,
            airlake: 30,
            icelake: 1,
            frostlake: 100,
            snowlake: 5
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