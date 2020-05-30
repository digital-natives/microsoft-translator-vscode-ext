import * as vscode from 'vscode'
import { getSecondaryLanguage, getTranslationsPromiseArray } from '../utils'

export function translateTextSecondary() {
  return vscode.commands.registerCommand(
    'extension.translateTextSecondary',
    function () {
      const editor = vscode.window.activeTextEditor
      const { document, selections } = editor!

      // vscodeTranslate.primaryLanguage
      let locale = getSecondaryLanguage()
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
