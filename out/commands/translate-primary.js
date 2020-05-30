"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateTextPrimary = void 0;
const vscode = require("vscode");
const utils_1 = require("../utils");
function translateTextPrimary() {
    return vscode.commands.registerCommand('extension.translateTextPrimary', function () {
        const editor = vscode.window.activeTextEditor;
        const { document, selections } = editor;
        // vscodeTranslate.primaryLanguage
        let locale = utils_1.getPrimaryLanguage();
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
exports.translateTextPrimary = translateTextPrimary;
//# sourceMappingURL=translate-primary.js.map