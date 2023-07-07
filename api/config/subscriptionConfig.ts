export const subscriptionConfig = {
    standardSubscriptionConfig: {
        price: 0.19,
        requestLimit: {
            airlake: 10000,
            evolake: 20,
            icelake: 20,
            snowlake: 100
        }
    },
    premiumSubscriptionConfig: {
        price: 0.49,
        requestLimit: {
            airlake: 30000,
            evolake: 60,
            icelake: 50,
            snowlake: 300
        }
    }
}