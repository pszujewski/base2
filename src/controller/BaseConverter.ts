import { IConversionResult } from "../models";
import BinaryTarget from "./BinaryTarget";
import DecimalTarget from "./DecimalTarget";

export default class BaseConverter {
    private binaryTarget: BinaryTarget;
    private decimalTarget: DecimalTarget;

    constructor() {
        this.binaryTarget = new BinaryTarget();
        this.decimalTarget = new DecimalTarget();
    }

    public convertToBaseTen(binaryNumber: string): IConversionResult {
        let conversion: IConversionResult;
        let decimalVal: string;

        try {
            decimalVal = this.decimalTarget.convertToDecimal(binaryNumber);
            conversion = { code: 0, body: { result: decimalVal } };
        } catch (err) {
            conversion = { code: 2, body: { error: `Failure: ${err.message}` } };
        }

        return conversion;
    }

    public convertToBaseTwo(decimalNumber: string): IConversionResult {
        let conversion: IConversionResult;
        let bits: string;

        try {
            bits = this.binaryTarget.getBitsFromDecimalNumber(decimalNumber);
            conversion = { code: 0, body: { result: bits } };
        } catch (err) {
            conversion = { code: 2, body: { error: `Failure: ${err.message}` } };
        }

        return conversion;
    }
}
