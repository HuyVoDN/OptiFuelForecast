class PricingModule {
    constructor(gallonsRequested, locationFactor, rateHistoryFactor, gallonsFactor, isOutOfState, isRepeatCustomer) {
        this.gallonsRequested = gallonsRequested;
        this.locationFactor = locationFactor; // not accounting for yet
        this.rateHistoryFactor = rateHistoryFactor; // not accounting for yet
        this.gallonsFactor = gallonsFactor; // not accounting for yet
        this.isOutOfState = isOutOfState;
        this.isRepeatCustomer = isRepeatCustomer;
        this.basePricePerGallon = 1.50; // This is a base price you can adjust
    }

    calculatePrice() {

        const locationPrice = this.basePricePerGallon * this.locationFactor; // we not accounting for this yet
        const rateHistoryPrice = this.basePricePerGallon * this.rateHistoryFactor; // we not accounting for this yet
        const gallonsPrice = this.basePricePerGallon * this.gallonsFactor;

        let suggestedPricePerGallon = this.basePricePerGallon + locationPrice + rateHistoryPrice + gallonsPrice;

        if (this.isOutOfState) {
            suggestedPricePerGallon *= 1.10; // Increase price by 10% for out of state
        } else {
            suggestedPricePerGallon *= 0.95; // Decrease price by 5% for in state
        }

        if (this.isRepeatCustomer) {
            suggestedPricePerGallon *= 0.90; // Decrease price by 10% for repeat customers
        }

        const totalAmountDue = this.gallonsRequested * suggestedPricePerGallon;

        return { suggestedPricePerGallon, totalAmountDue };
    }
}

export default PricingModule;