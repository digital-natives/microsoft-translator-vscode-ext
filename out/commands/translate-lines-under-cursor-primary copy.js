"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils_1 = require("../utils");
function default_1() {
    return vscode.commands.registerCommand('extension.translateLinesUnderCursorPrimary', function translateLinesUnderCursorPrimarycallback() {
        const editor = vscode.window.activeTextEditor;
        const { document, selections } = editor;
        let locale = utils_1.getPrimaryLanguage();
        if (!locale) {
            vscode.window.showWarningMessage('Primary language has not been set. Please set the primary language.');
            return;
        }
        const translationsPromiseArray = utils_1.getTranslationsPromiseArrayLine(selections, document, locale);
        Promise.all(translationsPromiseArray)
            .then(function (results) {
            editor.edit((builder) => {
                results.forEach((r) => {
                    if (!!r.translation) {
                        const ffix = ['', '\n'];
                        if (editor.document.lineCount - 1 === r.selection.start.line)
                            [ffix[0], ffix[1]] = [ffix[1], ffix[0]];
                        const p = new vscode.Position(r.selection.start.line + 1, 0);
                        builder.insert(p, `${ffix[0]}${r.translation}${ffix[1]}`);
                    }
                });
            });
        })
            .catch((e) => vscode.window.showErrorMessage(e.message));
    });
}
exports.default = default_1;
//# sourceMappingURL=translate-lines-under-cursor-primary copy.js.map