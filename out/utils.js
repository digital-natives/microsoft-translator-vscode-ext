"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslationsPromiseArrayLine = exports.getTranslationsPromiseArray = exports.getSubscriptionRegion = exports.getSubscriptionKey = exports.getSecondaryLanguage = exports.getPrimaryLanguage = exports.getLanguage = exports.getSelectedLineText = exports.getSelectedText = exports.updateLanguageList = void 0;
const vscode = require("vscode");
const languages_1 = require("./languages");
const api_1 = require("./api");
/**
 * Updates languages lists for the convenience of users
 *
 * @param {string} language The language code to update
 * @returns {undefined}
 */
function updateLanguageList(language, recentlyUsed) {
    if (recentlyUsed.find((r) => r.value === language.value)) {
        // Remove the recently used language from the list
        const index = recentlyUsed.findIndex((r) => r.value === language.value);
        recentlyUsed.splice(index, 1);
    }
    if (languages_1.languages.find((r) => r.value === language.value)) {
        // Remove the recently used language from languages list
        const index = languages_1.languages.findIndex((r) => r.value === language.value);
        languages_1.languages.splice(index, 1);
    }
    // Add the language in recently used languages
    recentlyUsed.splice(0, 0, language);
}
exports.updateLanguageList = updateLanguageList;
/**
 * Extracts a text from the active document selection
 *
 * @param document The current document
 * @param {vscode.Selection} selection The current selection
 * @returns {string} A text
 */
function getSelectedText(document, selection) {
    const charRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
    return document.getText(charRange);
}
exports.getSelectedText = getSelectedText;
/**
 * Gets a text of the first line from active selection
 *
 * @param document The current document
 * @param {vscode.Selection} selection The current selection
 * @returns {string}
 */
function getSelectedLineText(document, selection) {
    return document.getText(document.lineAt(selection.start.line).rangeIncludingLineBreak);
}
exports.getSelectedLineText = getSelectedLineText;
function getLanguage(choice) {
    return vscode.workspace
        .getConfiguration('microsoftTranslatorExt')
        .get(`${choice}Language`);
}
exports.getLanguage = getLanguage;
/**
 * Returns user's primary language
 *
 * @returns {string}
 */
function getPrimaryLanguage() {
    return getLanguage('primary') || 'en';
}
exports.getPrimaryLanguage = getPrimaryLanguage;
/**
 * Returns user's secondary language
 */
function getSecondaryLanguage() {
    return getLanguage('secondary') || 'ja';
}
exports.getSecondaryLanguage = getSecondaryLanguage;
/**
 * Returns the user's API key
 */
function getSubscriptionKey() {
    return vscode.workspace
        .getConfiguration('microsoftTranslatorExt')
        .get('subscriptionKey');
}
exports.getSubscriptionKey = getSubscriptionKey;
/**
 * Returns the user's data center region
 */
function getSubscriptionRegion() {
    return (vscode.workspace
        .getConfiguration('microsoftTranslatorExt')
        .get('subscriptionRegion') || 'canadacentral');
}
exports.getSubscriptionRegion = getSubscriptionRegion;
/**
 * Translates the text to the language like a Promise
 *
 * @param {string} text Text
 * @param {string} language Language
 * @param {vscode.Selection} selection Selection
 */
function getTranslationPromise(text, language, selection) {
    return new Promise((resolve, reject) => {
        const subscriptionKey = getSubscriptionKey();
        const subscriptionRegion = getSubscriptionRegion();
        if (!subscriptionKey) {
            return reject(new Error('A subscription key is required to perform translations.'));
        }
        (0, api_1.translate)(text, {
            language,
            subscriptionKey,
            subscriptionRegion,
        })
            .then(({ data }) => {
            var _a, _b;
            if (data && data[0]) {
                const translation = (_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.translations[0]) === null || _b === void 0 ? void 0 : _b.text;
                if (!translation) {
                    return reject(new Error("No translation is available or an error occurred on Microsoft's end"));
                }
                return resolve({
                    selection,
                    translation,
                });
            }
            reject(new Error("No translation is available or an error occurred on Microsoft's end"));
        })
            .catch(({ message }) => reject(new Error('An error occurred during translation: ' + message)));
    });
}
/**
 * Generates the array of promises based on selections
 *
 * @param selections Array of selections
 * @param document The current document
 * @param language The current language
 */
function getTranslationsPromiseArray(selections, document, language) {
    return selections.map((selection) => {
        const selectedText = getSelectedText(document, selection);
        return getTranslationPromise(selectedText, language, selection);
    });
}
exports.getTranslationsPromiseArray = getTranslationsPromiseArray;
/**
 * Gets arrays of Translation Promises based on the first lines under the cursor.
 *
 * @param selections The current selection
 * @param document The current document
 * @param selected
 */
function getTranslationsPromiseArrayLine(selections, document, selected) {
    return selections.map((selection) => {
        const selectedLineText = getSelectedLineText(document, selection);
        return getTranslationPromise(selectedLineText, selected, selection);
    });
}
exports.getTranslationsPromiseArrayLine = getTranslationsPromiseArrayLine;
//# sourceMappingURL=utils.js.map