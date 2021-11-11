import { translateText } from "./translate-text";
import { getPrimaryLanguage } from "../utils";

export function translateTextPrimary() {
  return translateText(
    'extension.translateTextPrimary',
    getPrimaryLanguage()
  )
}
