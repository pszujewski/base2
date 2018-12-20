import { IConversionResult } from "../models";

export default class BaseConverter {
    public convertToBaseTen(binaryNumber: string): IConversionResult {
        return { code: -1, body: { error: "" } };
    }

    public convertToBaseTwo(decimalNumber: string): IConversionResult {
        return { code: -1, body: { error: "" } };
    }
}
