import * as vscode from "vscode";
import { getTranslationsPromiseArray } from "../utils";

export function translateText(command: string, locale: string) {
  return vscode.commands.registerCommand(
    command,
    function () {
      const editor = vscode.window.activeTextEditor
      const { document, selections } = editor!

      // vscodeTranslate.primaryLanguage
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
          editor?.edit((builder) => {
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