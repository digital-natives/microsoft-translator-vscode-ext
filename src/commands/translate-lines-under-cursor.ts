import * as vscode from 'vscode'
import { Language } from '../types'
import { languages } from '../languages'
import { updateLanguageList, getTranslationsPromiseArrayLine } from '../utils'

export function translateLinesUnderCursor(recentlyUsed: Language[]) {
  return vscode.commands.registerCommand(
    'extension.translateLinesUnderCursor',
    function translateLinesUnderCursorcallback() {
      const editor = vscode.window.activeTextEditor
      const { document, selections } = editor!

      const quickPickData = recentlyUsed
        .map((r) => ({
          name: r.name.includes('(recently used)')
            ? r.name
            : `${r.name} (recently used)`,
          value: r.value,
        }))
        .concat(languages)

      vscode.window
        .showQuickPick(quickPickData.map((l) => l.name))
        .then((res) => {
          if (!res) return
          const language = quickPickData.find((t) => t.name === res)
          updateLanguageList(language!, recentlyUsed)
          const translationsPromiseArray = getTranslationsPromiseArrayLine(
            selections,
            document,
            language!.value
          )
          Promise.all(translationsPromiseArray)
            .then(function (results) {
              editor!.edit((builder) => {
                results.forEach((r) => {
                  if (!!r.translation) {
                    const ffix = ['', '\n']
                    if (
                      editor!.document.lineCount - 1 ===
                      r.selection.start.line
                    )
                      [ffix[0], ffix[1]] = [ffix[1], ffix[0]]
                    const p = new vscode.Position(r.selection.start.line + 1, 0)
                    builder.insert(p, `${ffix[0]}${r.translation}${ffix[1]}`)
                  }
                })
              })
            })
            .catch((e) => vscode.window.showErrorMessage(e.message))
        })
    }
  )
}
