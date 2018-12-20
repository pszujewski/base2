export default class BinaryTarget {
    public getBitsFromDecimalNumber(decimalNum: string): string {
        let bits: string;

        try {
            const decimal: number = this.prepareNumber(decimalNum);
            bits = this.accumulateBits(decimal, []);
        } catch (err) {
            throw err;
        }

        return bits;
    }

    private prepareNumber(decimalNum: string): number {
        let decimal: number;
        try {
            const asStr: string = decimalNum.replace(/,/g, "").trim();
            decimal = Number(asStr);
        } catch (err) {
            throw err;
        }
        return decimal;
    }

    private accumulateBits(decimalNum: number, acc: string[]): string {
        try {
            if (decimalNum === 0) {
                return acc.join("");
            }

            const quotient: number = Math.floor(decimalNum / 2);

            if (decimalNum % 2 === 1) {
                return this.accumulateBits(quotient, ["1", ...acc]);
            }

            return this.accumulateBits(quotient, ["0", ...acc]);
        } catch (err) {
            throw err;
        }
    }
}
