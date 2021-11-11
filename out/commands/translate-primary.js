"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateTextPrimary = void 0;
const translate_text_1 = require("./translate-text");
const utils_1 = require("../utils");
function translateTextPrimary() {
    return (0, translate_text_1.translateText)('extension.translateTextPrimary', (0, utils_1.getPrimaryLanguage)());
}
exports.translateTextPrimary = translateTextPrimary;
//# sourceMappingURL=translate-primary.js.map