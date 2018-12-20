import Log from "../Util";
import { IConversionResult } from "../models";

export default class BaseConverter {
  constructor() {
        try {
            Log.info("Mounting base converter");
        } catch (err) {
            Log.error("Error");
        }
  }

  public convertToBaseTen(binaryNumber: string): IConversionResult {
        return { code: -1, body: { error: "" } };
  }

  public convertToBaseTwo(decimalNumber: string): IConversionResult {
        return { code: -1, body: { error: "" } };
  }
}
