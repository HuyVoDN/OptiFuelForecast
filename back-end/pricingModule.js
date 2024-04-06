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

        if(this.isOutOfState) {
            this.locationFactor = 0.04;
        }

        if(this.isRepeatCustomer){
            this.rateHistoryFactor = - 0.01;
        }


        if(this.gallonsRequested > 1000){
            this.gallonsFactor = 0.02;
        }

        const locationPrice = this.basePricePerGallon * this.locationFactor; // 1.5 * 0.04 or 0.02
        const rateHistoryPrice = this.basePricePerGallon * this.rateHistoryFactor; // 1.5 * - 0.01 or 0.00
        const gallonsPrice = this.basePricePerGallon * this.gallonsFactor; // 1.5 * 0.02 or 0.03

        
        // Calculate the suggested price per gallon
        let suggestedPricePerGallon = parseFloat((this.basePricePerGallon + locationPrice + rateHistoryPrice + gallonsPrice + this.companyProfit).toFixed(2));

        // Calculate the total amount due
        const totalAmountDue = parseFloat((this.gallonsRequested * suggestedPricePerGallon).toFixed(2));
        // should be 1500 * 1.65 = 2490

        return { suggestedPricePerGallon, totalAmountDue };
    }
}

module.exports = PricingModule;