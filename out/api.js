"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const axios_1 = require("axios");
const uuid_1 = require("uuid");
function translate(text, options) {
    const clientTraceId = uuid_1.v4();
    const region = options.subscriptionRegion
        ? { 'Ocp-Apim-Subscription-region': options.subscriptionRegion }
        : {};
    return axios_1.default.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${options.language}`, [{ Text: text }], {
        headers: Object.assign({ 'Ocp-Apim-Subscription-Key': options.subscriptionKey, 'Content-type': 'application/json', 'X-ClientTraceId': clientTraceId }, region),
    });
}
exports.translate = translate;
// export function run() {
//   translate('Hello', {
//     language: { primary: 'en', secondary: 'ja' },
//     subscriptionKey: '615a85f4ebb04b158a4b82182ad1cb38',
//     subscriptionRegion: 'canadacentral',
//   })
//     .then(function (response) {
//       console.log(response.data[0].translations)
//     })
//     .catch((error) => console.log(error))
// }
//# sourceMappingURL=api.js.map