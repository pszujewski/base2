export default class DecimalTarget {
    public convertToDecimal(binaryNumber: string): string {
        let decimal: number;
        let displayDecimal: string;

        try {
            const digits: string[] = binaryNumber.trim().split("");

            decimal = digits.reduce(this.handleOneBit, 0);

            displayDecimal = decimal.toString();
        } catch (err) {
            throw err;
        }

        return displayDecimal;
    }

    private handleOneBit = (acc: number, curr: string): number => {
        return (2 * acc) + Number(curr);
    }
}
