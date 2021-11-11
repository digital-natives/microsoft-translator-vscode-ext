import * as vscode from 'vscode'
import { Language } from '../types'

import { updateLanguageList, getTranslationsPromiseArray } from '../utils'
import { languages } from '../languages'

export function translate(recentlyUsed: Language[]) {
  return vscode.commands.registerCommand(
    'extension.translateText',
    function () {
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
          // TODO: Throw an error message if a language doens't exist
          if (!language) {
            return vscode.window.showErrorMessage(`The selected language ${res} is not available`)
          }
          
          updateLanguageList(language!, recentlyUsed)
          const translationsPromiseArray = getTranslationsPromiseArray(
            selections,
            document,
            language!.value
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
        })
    }
  )
}
