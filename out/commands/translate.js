"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = void 0;
const vscode = require("vscode");
const utils_1 = require("../utils");
const languages_1 = require("../languages");
function translateText(recentlyUsed) {
    return vscode.commands.registerCommand('extension.translateText', function () {
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
            // TODO: Throw an error message if a language doens't exist
            utils_1.updateLanguageList(language, recentlyUsed);
            const translationsPromiseArray = utils_1.getTranslationsPromiseArray(selections, document, language.value);
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
    });
}
exports.translateText = translateText;
//# sourceMappingURL=translate.js.map