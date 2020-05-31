import { Language } from './types'

import vscode = require('vscode')
import { languages } from './languages'
import { translate } from './api'
/**
 * Updates languages lists for the convenience of users
 *
 * @param {string} language The language code to update
 * @returns {undefined}
 */
export function updateLanguageList(
  language: Language,
  recentlyUsed: Language[]
) {
  if (recentlyUsed.find((r) => r.value === language.value)) {
    // Remove the recently used language from the list
    const index = recentlyUsed.findIndex((r) => r.value === language.value)
    recentlyUsed.splice(index, 1)
  }
  if (languages.find((r) => r.value === language.value)) {
    // Remove the recently used language from languages list
    const index = languages.findIndex((r) => r.value === language.value)
    languages.splice(index, 1)
  }
  // Add the language in recently used languages
  recentlyUsed.splice(0, 0, language)
}

/**
 * Extracts a text from the active document selection
 *
 * @param document The current document
 * @param {vscode.Selection} selection The current selection
 * @returns {string} A text
 */
export function getSelectedText(
  document: vscode.TextDocument,
  selection: vscode.Selection
) {
  const charRange = new vscode.Range(
    selection.start.line,
    selection.start.character,
    selection.end.line,
    selection.end.character
  )
  return document.getText(charRange)
}

/**
 * Gets a text of the first line from active selection
 *
 * @param document The current document
 * @param {vscode.Selection} selection The current selection
 * @returns {string}
 */
export function getSelectedLineText(
  document: vscode.TextDocument,
  selection: vscode.Selection
) {
  return document.getText(
    document.lineAt(selection.start.line).rangeIncludingLineBreak
  )
}

export function getLanguage(
  choice: 'primary' | 'secondary'
): string | undefined {
  return vscode.workspace
    .getConfiguration('microsoftTranslatorExt')
    .get<string>(`${choice}Language`)
}

/**
 * Returns user's primary language
 *
 * @returns {string}
 */
export function getPrimaryLanguage(): string {
  return getLanguage('primary') || 'en'
}

/**
 * Returns user's secondary language
 */
export function getSecondaryLanguage(): string {
  return getLanguage('secondary') || 'ja'
}

/**
 * Returns the user's API key
 */
export function getSubscriptionKey(): string | undefined {
  return vscode.workspace
    .getConfiguration('microsoftTranslatorExt')
    .get('subscriptionKey')
}

/**
 * Returns the user's data center region
 */
export function getSubscriptionRegion(): string {
  return (
    vscode.workspace
      .getConfiguration('microsoftTranslatorExt')
      .get('subscriptionRegion') || 'canadacentral'
  )
}

/**
 * Translates the text to the language like a Promise
 *
 * @param {string} text Text
 * @param {string} language Language
 * @param {vscode.Selection} selection Selection
 */
function getTranslationPromise(
  text: string,
  language: string,
  selection: vscode.Selection
): Promise<{ selection: vscode.Selection; translation: string }> {
  return new Promise((resolve, reject) => {
    const subscriptionKey = getSubscriptionKey()
    const subscriptionRegion = getSubscriptionRegion()

    if (!subscriptionKey) {
      return reject(
        new Error('A subscription key is required to perform translations.')
      )
    }

    translate(text, {
      language,
      subscriptionKey,
      subscriptionRegion,
    })
      .then(({ data }) => {
        if (data && data[0]) {
          const translation = data[0]?.translations[0]?.text
          if (!translation) {
            return reject(
              new Error(
                "No translation is available or an error occurred on Microsoft's end"
              )
            )
          }
          return resolve({
            selection,
            translation,
          })
        }

        reject(
          new Error(
            "No translation is available or an error occurred on Microsoft's end"
          )
        )
      })
      .catch(({ message }) =>
        reject(new Error('An error occurred during translation: ' + message))
      )
  })
}

/**
 * Generates the array of promises based on selections
 *
 * @param selections Array of selections
 * @param document The current document
 * @param language The current language
 */
export function getTranslationsPromiseArray(
  selections: vscode.Selection[],
  document: vscode.TextDocument,
  language: string
) {
  return selections.map((selection) => {
    const selectedText = getSelectedText(document, selection)
    return getTranslationPromise(selectedText, language, selection)
  })
}

/**
 * Gets arrays of Translation Promises based on the first lines under the cursor.
 *
 * @param selections The current selection
 * @param document The current document
 * @param selected
 */
export function getTranslationsPromiseArrayLine(
  selections: vscode.Selection[],
  document: vscode.TextDocument,
  selected: string
) {
  return selections.map((selection) => {
    const selectedLineText = getSelectedLineText(document, selection)
    return getTranslationPromise(selectedLineText, selected, selection)
  })
}
