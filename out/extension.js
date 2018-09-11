'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const request = require("request");
var selections;
var subscriptionKey;
var appendText;
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.translate1', () => {
        let lang = vscode.workspace.getConfiguration('microsoftTranslatorExt')['firstLanguage'];
        onActivate(lang);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.translate2', () => {
        let lang = vscode.workspace.getConfiguration('microsoftTranslatorExt')['secondLanguage'];
        onActivate(lang);
    }));
}
exports.activate = activate;
function onActivate(lang) {
    if (!vscode.window.activeTextEditor) {
        showEmptyError();
        return;
    }
    init();
    if (selections.length === 1) {
        let selection = selections[0];
        if (selection.isEmpty) {
            showEmptyError();
            return;
        }
        translateSelection(selection, lang);
    }
}
function init() {
    subscriptionKey = vscode.workspace.getConfiguration('microsoftTranslatorExt')['apiKey'];
    appendText = vscode.workspace.getConfiguration('microsoftTranslatorExt')['appendText'];
    selections = vscode.window.activeTextEditor.selections;
}
function translateSelection(selection, lang) {
    let selectedText = vscode.window.activeTextEditor.document.getText(new vscode.Range(selection.start, selection.end));
    requestAPI(selectedText, lang, (err, res) => {
        if (err) {
            var error;
            if (err.body)
                error += JSON.parse(err.body);
            if (err.error)
                error += err.error.message;
            if (error)
                console.error(error);
            vscode.window.showErrorMessage('error ocurred on translation, see console for more details');
            return;
        }
        //res[0].translations[0].to
        if (res != null) {
            //console.log(JSON.stringify(res, null, 4));
            let text = res[0].translations[0].text;
            let lang = res[0].translations[0].to;
            let editor = vscode.window.activeTextEditor;
            //vscode.window.showInformationMessage(text);
            editor.edit((editBuilder) => {
                if (appendText) {
                    //console.log('appended');
                    editBuilder.insert(selection.active, ' [' + lang + ']: ' + text);
                }
                else {
                    //console.log('replaced');
                    editBuilder.replace(selection, text);
                }
            });
        }
    });
}
function requestAPI(query, lang, cb) {
    // Replace the subscriptionKey string value with your valid subscription key.
    const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + lang + '&textType=plain';
    let getGuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    var options = {
        method: 'post',
        body: [{ Text: query }],
        json: true,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'X-ClientTraceId': getGuid(),
        }
    };
    request(options, (err, res, body) => {
        if (err) {
            return cb(err);
        }
        cb(null, body);
    });
}
function showEmptyError() {
    vscode.window.showErrorMessage('Must select text to translate');
}
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map