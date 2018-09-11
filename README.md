<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/digital-natives/microsoft-translator-vscode-ext/master/assets/icons/icon.ico">
  <br>
  Microsoft Translator
</h1>
<h2 align="center">Translate a selected text using <a href="https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/">Microsoft Translator API.</a>
</h2>
<p>
<strong>Important:</strong> In order to use this 
extension you'll need to provide a <em>Microsoft Translator API Key</em> of your own. <b style="color:rgb(226, 58, 58)">Without the API Key this extension is useless for you.</b>
</p>

## Installation
1. Install the extension.
2. Create *Microsoft Translator API Key*. You can use [Step by step Guide](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-text-how-to-signup)
3. Add your API key in user settings configuration - `microsoftTranslatorExt.apiKey`
4. Configure the first and second target language `"microsoftTranslatorExt.firstLanguage":"en"`, `"microsoftTranslatorExt.secondLanguage":"de"`

## Optional settings
Set `microsoftTranslatorExt.appendText` to true in order to append the selected text to the translated text. By default, the text would be replaced.

## How to use
Select the text that you want to translate. Click right and execute `Translate to 2nd language` command.
> Tip: Use the shortcut `Ctrl+Shift+t` to translate the selected text.

## Language code table
[Supported Languages](https://docs.microsoft.com/de-de/azure/cognitive-services/translator/languages)
