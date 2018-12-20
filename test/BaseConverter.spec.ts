import { expect } from "chai";
import { IConversionResult, IConversionSuccessBody } from "../src/models";
import BaseConverter from "../src/controller/BaseConverter";

interface IAssertionParameters {
    input: string;
    expected: string;
}

describe("BaseConverter convert decimal to binary and vice versa", function () {
    let baseConverter: BaseConverter;

    before(function () {
        baseConverter = new BaseConverter();
    });

    it("Should convert a base 10 number to base 2", () => {
        let expectedCode: number = 0;
        let res: IConversionResult = { code: -1, body: { error: "" } };
        let successRes: IConversionSuccessBody;
        let expectedResult: string = "101";
        let test: IAssertionParameters;

        const tests: IAssertionParameters[] = [
            { input: "5", expected: "101" },
            { input: "12", expected: "1100" },
            { input: "21", expected: "10101" },
        ];

        for (test of tests) {
            try {
                res = baseConverter.convertToBaseTwo(test.input);
            } catch (err) {
                res = err;
                expect.fail("Test threw unexpected error");
            } finally {
                successRes = (res.body as IConversionSuccessBody);
                expect(res.code).to.equal(expectedCode);
                expect(successRes.result).to.equal(test.expected);
            }
        }
    });
});
