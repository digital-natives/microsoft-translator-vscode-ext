import * as vscode from 'vscode'
import { getPrimaryLanguage, getTranslationsPromiseArray } from '../utils'

export function translateTextPrimary() {
  return vscode.commands.registerCommand(
    'extension.translateTextPrimary',
    function () {
      const editor = vscode.window.activeTextEditor
      const { document, selections } = editor!

      // vscodeTranslate.primaryLanguage
      let locale = getPrimaryLanguage()
      if (!locale) {
        return
      }

      const translationsPromiseArray = getTranslationsPromiseArray(
        selections,
        document,
        locale
      )
      Promise.all(translationsPromiseArray)
        .then(function (results) {
          editor!.edit((builder) => {
            results.forEach((r) => {
              if (!!r.translation) {
                builder.replace(r.selection, r.translation)
              }
            })
          })
        })
        .catch((e) => vscode.window.showErrorMessage(e.message))
    }
  )
}
