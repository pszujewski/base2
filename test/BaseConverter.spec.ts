import { expect } from "chai";
import { IConversionResult, IConversionSuccessBody } from "../src/models";
import BaseConverter from "../src/controller/BaseConverter";

interface IAssertionParameters {
    decimal: string;
    binary: string;
}

const tests: IAssertionParameters[] = [
    { decimal: "5", binary: "101" },
    { decimal: "12", binary: "1100" },
    { decimal: "21", binary: "10101" },
    { decimal: "467", binary: "111010011" },
    { decimal: "58", binary: "111010" },
    { decimal: "63", binary: "111111" },
    { decimal: "1800", binary: "11100001000" },
];

describe("BaseConverter convert decimal to binary and vice versa", function () {
    let baseConverter: BaseConverter;

    before(function () {
        baseConverter = new BaseConverter();
    });

    it("Should convert a base 10 number to base 2", () => {
        let expectedCode: number = 0;
        let res: IConversionResult = { code: -1, body: { error: "" } };

        let successRes: IConversionSuccessBody;
        let test: IAssertionParameters;

        for (test of tests) {
            try {
                res = baseConverter.convertToBaseTwo(test.decimal);
            } catch (err) {
                res = err;
                expect.fail("Test threw unexpected error");
            } finally {
                successRes = (res.body as IConversionSuccessBody);
                expect(res.code).to.equal(expectedCode);
                expect(successRes.result).to.equal(test.binary);
            }
        }
    });

    it("Should convert a base 2 number to base 10", () => {
        let expectedCode: number = 0;
        let res: IConversionResult = { code: -1, body: { error: "" } };

        let successRes: IConversionSuccessBody;
        let test: IAssertionParameters;

        for (test of tests) {
            try {
                res = baseConverter.convertToBaseTen(test.binary);
            } catch (err) {
                res = err;
                expect.fail("Test threw unexpected error");
            } finally {
                successRes = (res.body as IConversionSuccessBody);
                expect(res.code).to.equal(expectedCode);
                expect(successRes.result).to.equal(test.decimal);
            }
        }
    });

    it("Should accept and process base 10 numbers with commas", () => {
        let expectedCode: number = 0;
        let res: IConversionResult = { code: -1, body: { error: "" } };

        let successRes: IConversionSuccessBody;
        let test: IAssertionParameters;

        const testsCommas: IAssertionParameters[] = [
            { decimal: "1,800", binary: "11100001000" },
            { decimal: "2,322", binary: "100100010010" },
        ];

        for (test of testsCommas) {
            try {
                res = baseConverter.convertToBaseTwo(test.decimal);
            } catch (err) {
                res = err;
                expect.fail("Test threw unexpected error");
            } finally {
                successRes = (res.body as IConversionSuccessBody);
                expect(res.code).to.equal(expectedCode);
                expect(successRes.result).to.equal(test.binary);
            }
        }
    });
});
