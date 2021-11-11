"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateTextSecondary = void 0;
const translate_text_1 = require("./translate-text");
const utils_1 = require("../utils");
function translateTextSecondary() {
    return (0, translate_text_1.translateText)('extension.translateTextSecondary', (0, utils_1.getSecondaryLanguage)());
}
exports.translateTextSecondary = translateTextSecondary;
//# sourceMappingURL=translate-secondary.js.map