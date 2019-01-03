import DigitsValidator from "./DigitsValidator";

/**
 * From https://blog.angularindepth.com/the-simple-math-behind-decimal-binary-conversion-algorithms-d30c967c9724
 * To convert binary integer to decimal, start from the left.
 * Take your current total, multiply it by two and add the current digit.
 * Continue until there are no more digits left.
 */

export default class DecimalTarget {
    private validator: DigitsValidator;

    constructor() {
        this.validator = new DigitsValidator();
    }

    /**
     *
     * @param binaryNumber
     * Given a binary integer, converts it to a decimal system integer
     */
    public convertToDecimal(binaryNumber: string): string {
        let decimal: number;
        let displayDecimal: string;

        try {
            if (!this.isValidBinaryNumInput(binaryNumber)) {
                throw new Error("Must input valid binary number for conversion to decimal");
            }

            const digits: string[] = binaryNumber.trim().split("");

            decimal = digits.reduce(this.handleOneBit, 0);

            displayDecimal = decimal.toString();
        } catch (err) {
            throw err;
        }

        return displayDecimal;
    }

    /**
     *
     * @param binaryNumber
     * Produces true if the given number (as a str) is a valid binary integer
     * All digits must be either 1 or 0
     */
    private isValidBinaryNumInput(binaryNumber: string): boolean {
        const isValidNum: boolean = this.validator.isValidUserInput(binaryNumber);
        const hasOnlyBits: boolean = /^(0|1)+$/.test(binaryNumber);
        return isValidNum && hasOnlyBits;
    }

    /**
     * Multiplies the current binary digit by 2 and adds it to the accumulator
     */
    private handleOneBit = (acc: number, curr: string): number => {
        return (2 * acc) + Number(curr);
    }
}
