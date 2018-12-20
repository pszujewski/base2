/**
 * Common CLI exit codes:
 * 0: No error. The script executed successfully.
 * -1: A registry key or file required for Command Manager was not found.
 * 1: Command Manager was unable to load and prepare its operating environment.
 * 2: The command line parameters could not be parsed.
 */

export interface IConversionResult {
    code: number;
    body: IConversionSuccessBody | IConversionErrorBody;
}

export interface IConversionSuccessBody {
    result: string;
}

export interface IConversionErrorBody {
    error: string;
}