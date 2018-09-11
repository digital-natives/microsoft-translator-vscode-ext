'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const request = require("request");
var selections;
var subscriptionKey;
var appendText;
function activate(context) {
<<<<<<< HEAD
    context.subscriptions.push(vscode.commands.registerCommand('extension.translate1', () => {
        let lang = vscode.workspace.getConfiguration('microsoftTranslatorExt')['firstLanguage'];
        onActivate(lang);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.translate2', () => {
        let lang = vscode.workspace.getConfiguration('microsoftTranslatorExt')['secondLanguage'];
        onActivate(lang);
=======
    context.subscriptions.push(vscode.commands.registerCommand('extension.translateToEn', () => {
        onActivate('from=de&to=en');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.translateToDe', () => {
        onActivate('from=en&to=de');
>>>>>>> 9feb215... no message
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
<<<<<<< HEAD
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
=======
            console.log(JSON.stringify(res, null, 4));
            let text = res[0].translations[0].text;
            let lang = res[0].translations[0].to;
            let editor = vscode.window.activeTextEditor;
            vscode.window.showInformationMessage(text);
            editor.edit((editBuilder) => {
                if (appendText) {
                    console.log('appended');
                    editBuilder.insert(selection.active, ' [' + lang + ']: ' + text);
                }
                else {
                    console.log('replaced');
>>>>>>> 9feb215... no message
                    editBuilder.replace(selection, text);
                }
            });
        }
    });
}
function requestAPI(query, lang, cb) {
    // Replace the subscriptionKey string value with your valid subscription key.
<<<<<<< HEAD
    const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + lang + '&textType=plain';
=======
    const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&' + lang + '&textType=plain';
>>>>>>> 9feb215... no message
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