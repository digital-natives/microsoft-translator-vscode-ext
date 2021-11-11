"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = void 0;
const vscode = require("vscode");
const utils_1 = require("../utils");
function translateText(command, locale) {
    return vscode.commands.registerCommand(command, function () {
        const editor = vscode.window.activeTextEditor;
        const { document, selections } = editor;
        // vscodeTranslate.primaryLanguage
        if (!locale) {
            return;
        }
        const translationsPromiseArray = (0, utils_1.getTranslationsPromiseArray)(selections, document, locale);
        Promise.all(translationsPromiseArray)
            .then(function (results) {
            editor === null || editor === void 0 ? void 0 : editor.edit((builder) => {
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
exports.translateText = translateText;
//# sourceMappingURL=translate-text.js.map