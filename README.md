<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/digital-natives/microsoft-translator-vscode-ext/master/assets/icons/icon.ico">
  <br>
  Microsoft Translator
</h1>
<h2 align="center">Translate a selected text using <a href="https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/">Microsoft Translator API.</a>
</h2>

## Installation
1. Install the extension.
2. Create *Microsoft Translator API Key*. You can use [Step by step Guide](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-text-how-to-signup)
3. Add your API key in user settings configuration - `Subscription Key`
4. Add your data center region (optional) - `Subscription Region`
5. Configure the primary and secondary language - `Primary Language`, `Secondary Language`

## Settings

`Primary Language` - The primary language to set. This would be your native language and can be used convert a foreign language to your native language.

`Secondary Language` (optional) - The secondary language to set. This would be the language to convert to. However, you may use the command palette to select a language to convert to.

`Subscription Key` - The API key from the resource manager.

`Subscription Region` (optional) - The data center location.


## How to use

### Command Palette

You may use the command pallete to convert to a specific language, primary language, or secondary language.
There is also an option to translate the text and add it the next line.

### Selection

Select the text that you want to translate. Click right and execute `Translate to 2nd language` command.
> Tip: Use the shortcut `Ctrl+Shift+t` to translate the selected text.

## Language code table
[Supported Languages](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/languages)
