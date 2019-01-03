import program from "commander";
import BaseConverter from "./controller/BaseConverter";

import { IConversionResult } from "./models";
import ConversionPrinter from "./ui/ConversionPrinter";

// Main entry point

class App {
    private converter: BaseConverter;
    private printer: ConversionPrinter;

    constructor() {
        this.converter = new BaseConverter();
        this.printer = new ConversionPrinter();
    }

    /**
     * Sets up the program object from commander to handle args passed
     * by user. The 'target' arg refers to number system target, so either
     * 'binary' or 'decimal'
     */
    public execute(): void {
        const v: string = "0.1.0";
        const args: string = "<target> <digits>";

        program.version(v).arguments(args).action(this.onDigitsGiven);
        program.parse(process.argv);
    }

    /**
     * Callback provided to commander program object to execute on
     * the 'action' event
     */
    private onDigitsGiven = (target: string, digits: string): void => {
        let conversion: IConversionResult;
        try {
            conversion = this.converter.convertDigitsByTarget(target, digits);
            this.printer.display(target, digits, conversion);
        } catch (err) {
            this.printer.generalError();
        }
    }
}

const app = new App();

app.execute();
