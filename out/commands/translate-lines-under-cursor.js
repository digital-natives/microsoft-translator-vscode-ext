"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateLinesUnderCursor = void 0;
const vscode = require("vscode");
const languages_1 = require("../languages");
const utils_1 = require("../utils");
function translateLinesUnderCursor(recentlyUsed) {
    return vscode.commands.registerCommand('extension.translateLinesUnderCursor', function translateLinesUnderCursorcallback() {
        const editor = vscode.window.activeTextEditor;
        const { document, selections } = editor;
        const quickPickData = recentlyUsed
            .map((r) => ({
            name: r.name.includes('(recently used)')
                ? r.name
                : `${r.name} (recently used)`,
            value: r.value,
        }))
            .concat(languages_1.languages);
        vscode.window
            .showQuickPick(quickPickData.map((l) => l.name))
            .then((res) => {
            if (!res)
                return;
            const language = quickPickData.find((t) => t.name === res);
            (0, utils_1.updateLanguageList)(language, recentlyUsed);
            const translationsPromiseArray = (0, utils_1.getTranslationsPromiseArrayLine)(selections, document, language.value);
            Promise.all(translationsPromiseArray)
                .then(function (results) {
                editor.edit((builder) => {
                    results.forEach((r) => {
                        if (!!r.translation) {
                            const ffix = ['', '\n'];
                            if (editor.document.lineCount - 1 ===
                                r.selection.start.line)
                                [ffix[0], ffix[1]] = [ffix[1], ffix[0]];
                            const p = new vscode.Position(r.selection.start.line + 1, 0);
                            builder.insert(p, `${ffix[0]}${r.translation}${ffix[1]}`);
                        }
                    });
                });
            })
                .catch((e) => vscode.window.showErrorMessage(e.message));
        });
    });
}
exports.translateLinesUnderCursor = translateLinesUnderCursor;
//# sourceMappingURL=translate-lines-under-cursor.js.map