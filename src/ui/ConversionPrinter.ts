import Log from "../Util";
import { IConversionResult, IConversionSuccessBody, IConversionErrorBody } from "../models";

export default class ConversionPrinter {
    /**
     *
     * @param target
     * @param original
     * @param conversion
     * Prints the conversion result to sdout, user views result in the terminal
     */
    public display(target: string, original: string, conversion: IConversionResult): void {
        let resultBody: IConversionSuccessBody;
        let errorBody: IConversionErrorBody;

        if (conversion.body.hasOwnProperty("result")) {
            resultBody = (conversion.body as IConversionSuccessBody);
            Log.printSpace();
            Log.info(`Conversion to ${target}: ${resultBody.result}`);
            Log.printSpace();
            Log.info(`Original input was ${original}`);
            Log.printSpace();
        } else {
            errorBody = (conversion.body as IConversionErrorBody);
            Log.printSpace();
            Log.error(errorBody.error);
            Log.printSpace();
        }
    }

    public generalError(): void {
        Log.printSpace();
        Log.error("Failed to parse. Enter node ./App.js <\"binary\"|\"decimal\"> <digits>");
        Log.printSpace();
    }
}
