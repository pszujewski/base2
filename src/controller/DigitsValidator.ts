export default class DigitsValidator {
    public isValidUserInput(numStr: string): boolean {
        try {
            if (!numStr) {
                return false;
            }

            if (!this.strOnlyContainsDigits(numStr)) {
                return false;
            }
        } catch (err) {
            throw err;
        }
        return true;
    }

    private strOnlyContainsDigits(numStr: string): boolean {
        try {
            return /^\d+$/.test(numStr);
        } catch (err) {
            throw err;
        }
    }
}
