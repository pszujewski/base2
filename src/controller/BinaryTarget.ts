import DigitsValidator from "./DigitsValidator";

// Converts the given decimal number to a binary number

/**
 * From https://blog.angularindepth.com/the-simple-math-behind-decimal-binary-conversion-algorithms-d30c967c9724
 * To convert integer to binary, start with the integer in question and divide it
 * by 2 keeping notice of the quotient and the remainder. Continue dividing
 * the quotient by 2 until you get a quotient of zero. Then just write out the
 * remainders in the reverse order.
 */

export default class BinaryTarget {
    private validator: DigitsValidator;

    constructor() {
        this.validator = new DigitsValidator();
    }

    public getBitsFromDecimalNumber(decimalNum: string): string {
        let bits: string;

        try {
            if (!this.validator.isValidUserInput(decimalNum)) {
                throw new Error("Please input a valid decimal number for conversion to binary");
            }

            const decimal: number = this.prepareNumber(decimalNum);

            bits = this.accumulateBits(decimal, []);
        } catch (err) {
            throw err;
        }

        return bits;
    }

    /**
     *
     * @param decimalNum
     * Strips off any commas given in the decimal number
     */
    private prepareNumber(decimalNum: string): number {
        let decimal: number;
        try {
            const asStr: string = decimalNum.replace(/,/g, "").trim();
            decimal = Number(asStr);
        } catch (err) {
            throw err;
        }
        return decimal;
    }

    /**
     *
     * @param decimalNum
     * @param acc
     * Uses accumulator recursion to identify each bit needed to represent
     * the decimal system number as a binary system number
     */
    private accumulateBits(decimalNum: number, acc: string[]): string {
        try {
            // base case
            if (decimalNum === 0) {
                return acc.join("");
            }

            const quotient: number = Math.floor(decimalNum / 2);

            if (decimalNum % 2 === 1) {
                return this.accumulateBits(quotient, ["1", ...acc]);
            }

            return this.accumulateBits(quotient, ["0", ...acc]);
        } catch (err) {
            throw err;
        }
    }
}
