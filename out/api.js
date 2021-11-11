"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const axios_1 = require("axios");
const uuid_1 = require("uuid");
function translate(text, options) {
    var _a, _b;
    const clientTraceId = (0, uuid_1.v4)();
    return axios_1.default.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${options.language}`, [{ Text: text }], {
        headers: {
            'Ocp-Apim-Subscription-Key': (_a = options.subscriptionKey) !== null && _a !== void 0 ? _a : '',
            'Content-type': 'application/json',
            'X-ClientTraceId': clientTraceId,
            'Ocp-Apim-Subscription-region': (_b = options.subscriptionRegion) !== null && _b !== void 0 ? _b : ''
        },
    });
}
exports.translate = translate;
//# sourceMappingURL=api.js.map