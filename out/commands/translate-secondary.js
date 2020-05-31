"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateTextSecondary = void 0;
const vscode = require("vscode");
const utils_1 = require("../utils");
function translateTextSecondary() {
    return vscode.commands.registerCommand('extension.translateTextSecondary', function () {
        const editor = vscode.window.activeTextEditor;
        const { document, selections } = editor;
        // vscodeTranslate.primaryLanguage
        let locale = utils_1.getSecondaryLanguage();
        if (!locale) {
            return;
        }
        const translationsPromiseArray = utils_1.getTranslationsPromiseArray(selections, document, locale);
        Promise.all(translationsPromiseArray)
            .then(function (results) {
            editor.edit((builder) => {
                results.forEach((r) => {
                    if (!!r.translation) {
                        builder.replace(r.selection, r.translation);
                    }
                });
            });
        })
            .catch((e) => vscode.window.showErrorMessage(e.message));
    });
}
exports.translateTextSecondary = translateTextSecondary;
//# sourceMappingURL=translate-secondary.js.map