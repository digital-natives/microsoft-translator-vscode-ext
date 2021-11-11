'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const commands_1 = require("./commands");
/**
 * Keeps a list of most recently used languages
 */
const recentlyUsed = [];
/**
 * Platform binding function
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // @ts-ignore
    console.log(translateText);
    // Translate
    context.subscriptions.push((0, commands_1.translate)(recentlyUsed));
    // Translate with primary language
    context.subscriptions.push((0, commands_1.translateTextPrimary)());
    // Translate with secondary language
    context.subscriptions.push((0, commands_1.translateTextSecondary)());
    // Translate lines under cursor
    context.subscriptions.push((0, commands_1.translateLinesUnderCursor)(recentlyUsed));
    // Translate lines under cursor with primary language
    context.subscriptions.push((0, commands_1.translateLinesUnderCursorPrimary)());
    // Translate lines under cursor with secondary language
    context.subscriptions.push((0, commands_1.translateLinesUnderCursorSecondary)());
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map