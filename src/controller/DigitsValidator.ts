export default class DigitsValidator {
    public isValidUserInput(numStr: string): boolean {
        try {
            if (!numStr) {
                return false;
            }

            if (!this.strOnlyContainsDigitsOrCommas(numStr)) {
                return false;
            }
        } catch (err) {
            throw err;
        }
        return true;
    }

    private strOnlyContainsDigitsOrCommas(numStr: string): boolean {
        try {
            return /^(\d|,)+$/.test(numStr);
        } catch (err) {
            throw err;
        }
    }
}
