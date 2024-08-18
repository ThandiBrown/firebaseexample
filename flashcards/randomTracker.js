class RandomNumberGenerator {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.suggestedNumbers = new Set();
    }

    getRandomNumber() {
        if (this.suggestedNumbers.size >= (this.max - this.min + 1)) {
            this.suggestedNumbers.clear();
        }

        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
            // console.log(this.suggestedNumbers);
            // console.log(this.suggestedNumbers.has(randomNumber));
            // console.log(randomNumber);
            // console.log(this.suggestedNumbers.size >= (this.max - this.min + 1));
            // console.log(this.suggestedNumbers.size >= (this.max - this.min + 1) && this.suggestedNumbers.has(randomNumber));
        } while (this.suggestedNumbers.has(randomNumber));

        this.suggestedNumbers.add(randomNumber);
        return randomNumber;
    }
    
    addSuggestedNumber(number) {
        this.suggestedNumbers.add(number);
        if (this.suggestedNumbers.size >= (this.max - this.min + 1)) {
            this.suggestedNumbers.clear();
        }
    }
}


export {
    RandomNumberGenerator
}