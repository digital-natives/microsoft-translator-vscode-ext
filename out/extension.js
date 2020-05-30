'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const translate_1 = require("./commands/translate");
const translate_primary_1 = require("./commands/translate-primary");
const translate_secondary_1 = require("./commands/translate-secondary");
const translate_lines_under_cursor_1 = require("./commands/translate-lines-under-cursor");
const translate_lines_under_cursor_primary_1 = require("./commands/translate-lines-under-cursor-primary");
const translate_lines_under_cursor_secondary_1 = require("./commands/translate-lines-under-cursor-secondary");
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
    console.log(translate_1.translateText);
    // Translate
    context.subscriptions.push(translate_1.translateText(recentlyUsed));
    // Translate with primary language
    context.subscriptions.push(translate_primary_1.translateTextPrimary());
    // Translate with secondary language
    context.subscriptions.push(translate_secondary_1.translateTextSecondary());
    // Translate lines under cursor
    context.subscriptions.push(translate_lines_under_cursor_1.translateLinesUnderCursor(recentlyUsed));
    // Translate lines under cursor with primary language
    context.subscriptions.push(translate_lines_under_cursor_primary_1.translateLinesUnderCursorPrimary());
    // Translate lines under cursor with secondary language
    context.subscriptions.push(translate_lines_under_cursor_secondary_1.translateLinesUnderCursorSecondary());
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map