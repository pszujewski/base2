import program from "commander";
import BaseConverter from "./controller/BaseConverter";
import { IConversionResult, IConversionErrorBody, IConversionSuccessBody } from "./models";
import Log from "./Util";

class App {
    private converter: BaseConverter;

    constructor() {
        this.converter = new BaseConverter();
    }

    public base2Init(): void {
        let conversion: IConversionResult;
        let errorBody: IConversionErrorBody;
        let resultBody: IConversionSuccessBody;

        program
            .version("0.1.0")
            .arguments("<target> <digits>")
            .action((target: string, digits: string) => {
                if (target === "binary") {
                    conversion = this.converter.convertToBaseTwo(digits);
                } else {
                    conversion = this.converter.convertToBaseTen(digits);
                }

                if (conversion.body.hasOwnProperty("result")) {
                    resultBody = (conversion.body as IConversionSuccessBody);
                    Log.info(`Conversion to ${target}: ${resultBody.result}`);
                    Log.info(`Original input was ${digits}`);
                } else {
                    errorBody = (conversion.body as IConversionErrorBody);
                    Log.error(errorBody.error);
                }
            });

        program.parse(process.argv);
    }
}

const app = new App();

app.base2Init();
