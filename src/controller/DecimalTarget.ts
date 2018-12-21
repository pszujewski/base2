import DigitsValidator from "./DigitsValidator";

export default class DecimalTarget {
    private validator: DigitsValidator;

    constructor() {
        this.validator = new DigitsValidator();
    }

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

    private isValidBinaryNumInput(binaryNumber: string): boolean {
        const isValidNum: boolean = this.validator.isValidUserInput(binaryNumber);
        const hasOnlyBits: boolean = /^(0|1)+$/.test(binaryNumber);
        return isValidNum && hasOnlyBits;
    }

    private handleOneBit = (acc: number, curr: string): number => {
        return (2 * acc) + Number(curr);
    }
}
