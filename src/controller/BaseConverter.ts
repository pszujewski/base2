import { IConversionResult } from "../models";
import BinaryTarget from "./BinaryTarget";
import DecimalTarget from "./DecimalTarget";

enum NumberSystemTargets {
    binary = "binary",
    decimal = "decimal",
}

export default class BaseConverter {
    private binaryTarget: BinaryTarget;
    private decimalTarget: DecimalTarget;

    constructor() {
        this.binaryTarget = new BinaryTarget();
        this.decimalTarget = new DecimalTarget();
    }

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
