'use strict';

import * as vscode from 'vscode';
import * as request from 'request';

var selections: vscode.Selection[];
var subscriptionKey: any;
var appendText: boolean;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.translate1', () => {
		let lang = vscode.workspace.getConfiguration('microsoftTranslatorExt')['firstLanguage'];
		onActivate(lang);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('extension.translate2', () => {
		let lang = vscode.workspace.getConfiguration('microsoftTranslatorExt')['secondLanguage'];
		onActivate(lang);
	}));
}

function onActivate(lang: string): void {
	if (!vscode.window.activeTextEditor) {
		showEmptyError(); 
		return;
	}

	init();

	if (selections.length === 1) {
		let selection: vscode.Selection = selections[0];
		if (selection.isEmpty) {
			showEmptyError();
			return;
		}
		translateSelection(selection, lang);
	}
}   

function init(): void {
	subscriptionKey = vscode.workspace.getConfiguration('microsoftTranslatorExt')['apiKey'];
	appendText = vscode.workspace.getConfiguration('microsoftTranslatorExt')['appendText'];
	selections = vscode.window.activeTextEditor.selections;
}

function translateSelection(selection: any, lang: string) {
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
				} else {
					//console.log('replaced');
					editBuilder.replace(selection, text);
				}
			});
		}
	});
}

function requestAPI(query: string, lang: string, cb: (err: any, response?: any) => void) {
	// Replace the subscriptionKey string value with your valid subscription key.
	const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + lang + '&textType=plain';

	let getGuid = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
		});
	};
	var options = {
		method: 'post',
		body: [{ Text : query }],
		json: true,
		url: url,
		headers : {
			'Content-Type': 'application/json',
			'Ocp-Apim-Subscription-Key': subscriptionKey,
			'X-ClientTraceId': getGuid(),
		}
	};
	request(options, (err: any, res: any, body: any) => {
		if (err) {
			return cb(err);
		}
		cb(null, body);
	});
}

function showEmptyError(): void {
	vscode.window.showErrorMessage('Must select text to translate');
}

// this method is called when your extension is deactivated
export function deactivate() {
}