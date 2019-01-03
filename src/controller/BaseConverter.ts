import { IConversionResult } from "../models";
import BinaryTarget from "./BinaryTarget";
import DecimalTarget from "./DecimalTarget";

enum NumberSystemTargets {
    binary = "binary",
    decimal = "decimal",
}

// Entry point for retrieving a conversion

export default class BaseConverter {
    private binaryTarget: BinaryTarget;
    private decimalTarget: DecimalTarget;

    constructor() {
        this.binaryTarget = new BinaryTarget();
        this.decimalTarget = new DecimalTarget();
    }

    /**
     *
     * @param target
     * @param digits
     * Target identifies the number system to which we are converting the given
     * digits
     */
    public convertDigitsByTarget(target: string, digits: string): IConversionResult {
        let conversion: IConversionResult;

        try {
            if (target === NumberSystemTargets.binary) {
                conversion = this.convertToBaseTwo(digits);
            } else if (target === NumberSystemTargets.decimal) {
                conversion = this.convertToBaseTen(digits);
            } else {
                conversion = { code: 2, body: { error: "Invalid target number system" } };
            }
        } catch (err) {
            conversion = { code: 2, body: { error: err.message } };
        }

        return conversion;
    }

    /**
     *
     * @param binaryNumber
     * Given a binary system number, converts it to decimal system number
     */
    private convertToBaseTen(binaryNumber: string): IConversionResult {
        let conversion: IConversionResult;
        let decimalVal: string;

        try {
            decimalVal = this.decimalTarget.convertToDecimal(binaryNumber);
            conversion = { code: 0, body: { result: decimalVal } };
        } catch (err) {
            conversion = { code: 2, body: { error: err.message } };
        }

        return conversion;
    }

    /**
     *
     * @param decimalNumber
     * Given a decimal system number, converts it to binary
     */
    private convertToBaseTwo(decimalNumber: string): IConversionResult {
        let conversion: IConversionResult;
        let bits: string;

        try {
            bits = this.binaryTarget.getBitsFromDecimalNumber(decimalNumber);
            conversion = { code: 0, body: { result: bits } };
        } catch (err) {
            conversion = { code: 2, body: { error: err.message } };
        }

        return conversion;
    }
}
