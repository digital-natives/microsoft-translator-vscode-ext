import * as vscode from 'vscode'
import { getSecondaryLanguage, getTranslationsPromiseArrayLine } from '../utils'

export function translateLinesUnderCursorSecondary() {
  return vscode.commands.registerCommand(
    'extension.translateLinesUnderCursorSecondary',
    function translateLinesUnderCursorSecondaryCallback() {
      const editor = vscode.window.activeTextEditor
      const { document, selections } = editor!
      let locale = getSecondaryLanguage()
      if (!locale) {
        vscode.window.showWarningMessage(
          'Secondary language has not been set. Please set the secondary language.'
        )
        return
      }

      const translationsPromiseArray = getTranslationsPromiseArrayLine(
        selections,
        document,
        locale
      )

      Promise.all(translationsPromiseArray)
        .then(function (results) {
          editor!.edit((builder) => {
            results.forEach((r) => {
              if (!!r.translation) {
                const ffix = ['', '\n']
                if (editor!.document.lineCount - 1 === r.selection.start.line)
                  [ffix[0], ffix[1]] = [ffix[1], ffix[0]]
                const p = new vscode.Position(r.selection.start.line + 1, 0)
                builder.insert(p, `${ffix[0]}${r.translation}${ffix[1]}`)
              }
            })
          })
        })
        .catch((e) => vscode.window.showErrorMessage(e.message))
    }
  )
}
