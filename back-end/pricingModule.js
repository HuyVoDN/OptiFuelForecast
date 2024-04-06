class PricingModule {
    constructor(gallonsRequested, isOutOfState, isRepeatCustomer) {
        this.gallonsRequested = gallonsRequested; 
        this.locationFactor = 0.02; // either 0.04 or 0.02 for in Texas vs out of Texas
        this.rateHistoryFactor = 0; // either -0.01 or 0.00 for repeat customers vs new
        this.gallonsFactor = 0.03; // either 0.02 or 0.03 for over 1000 gallons vs under 1000
        this.isOutOfState = isOutOfState; 
        this.isRepeatCustomer = isRepeatCustomer;
        this.basePricePerGallon = 1.50; // This is a base price you can adjust
        this.companyProfit = 0.1; // 10% profit margin ALWAYS
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

module.exports = PricingModule;