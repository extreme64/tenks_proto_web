'use strict';
export default class Misc {

    /**
     * Scan string for placeholders to repalce with values
     *
     * @static
     * @param {*} text
     * @param {*} values
     * @returns
     * @memberof Misc
     */
    static scanf(text, values) {

        // Number of found placeholders must meach number of values
        if ((text.match(/%./g) || []).length !== values.length) return false

        values.forEach(val => {
            text = text.replace("%s", val)
        });
        return text
    }
}