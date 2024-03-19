class PricingModule {
    constructor(gallonsRequested, locationFactor, rateHistoryFactor, gallonsFactor, isOutOfState, isRepeatCustomer) {
        this.gallonsRequested = gallonsRequested;
        this.locationFactor = locationFactor;
        this.rateHistoryFactor = rateHistoryFactor;
        this.gallonsFactor = gallonsFactor;
        this.isOutOfState = isOutOfState;
        this.isRepeatCustomer = isRepeatCustomer;
        this.basePricePerGallon = 1.50; // This is a base price you can adjust
    }

    calculatePrice() {
        // Calculate the price factors
        const locationPrice = this.basePricePerGallon * this.locationFactor;
        const rateHistoryPrice = this.basePricePerGallon * this.rateHistoryFactor;
        const gallonsPrice = this.basePricePerGallon * this.gallonsFactor;

        // Calculate the suggested price per gallon
        let suggestedPricePerGallon = this.basePricePerGallon + locationPrice + rateHistoryPrice + gallonsPrice;

        // Adjust price based on out of state and repeat customer factors
        if (this.isOutOfState) {
            suggestedPricePerGallon *= 1.10; // Increase price by 10% for out of state
        } else {
            suggestedPricePerGallon *= 0.95; // Decrease price by 5% for in state
        }

        if (this.isRepeatCustomer) {
            suggestedPricePerGallon *= 0.90; // Decrease price by 10% for repeat customers
        }

        // Calculate the total amount due
        const totalAmountDue = this.gallonsRequested * suggestedPricePerGallon;

        return { suggestedPricePerGallon, totalAmountDue };
    }
}

export default PricingModule;