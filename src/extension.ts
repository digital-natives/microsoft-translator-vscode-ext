'use strict'
import * as vscode from 'vscode'

import { Language } from './types'
import {
  translate,
  translateLinesUnderCursor,
  translateLinesUnderCursorPrimary,
  translateLinesUnderCursorSecondary,
  translateTextPrimary,
  translateTextSecondary
} from './commands'

/**
 * Keeps a list of most recently used languages
 */
const recentlyUsed: Language[] = []

/**
 * Platform binding function
 *
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
  // @ts-ignore
  console.log(translateText)
  // Translate
  context.subscriptions.push(translate(recentlyUsed))
  // Translate with primary language
  context.subscriptions.push(translateTextPrimary())
  // Translate with secondary language
  context.subscriptions.push(translateTextSecondary())
  // Translate lines under cursor
  context.subscriptions.push(translateLinesUnderCursor(recentlyUsed))
  // Translate lines under cursor with primary language
  context.subscriptions.push(translateLinesUnderCursorPrimary())
  // Translate lines under cursor with secondary language
  context.subscriptions.push(translateLinesUnderCursorSecondary())
}
// This method is called when your extension is deactivated
export function deactivate() {}
