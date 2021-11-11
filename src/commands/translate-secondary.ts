import { translateText } from "./translate-text";
import { getSecondaryLanguage } from "../utils";

export function translateTextSecondary() {
  return translateText(
    'extension.translateTextSecondary',
    getSecondaryLanguage()
  )
}
