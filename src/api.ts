import axios, { AxiosResponse } from 'axios'
import { v4 } from 'uuid'

type TranslateOptions = {
  language: string
  subscriptionKey: string
  subscriptionRegion: string
}

type Translation = {
  text: string
  to: string
}

type TranslationResponse = AxiosResponse<
  Array<{ translations: Array<Translation> }>
>

export function translate(text: string, options: TranslateOptions) {
  const clientTraceId = v4()
  const region = options.subscriptionRegion
    ? { 'Ocp-Apim-Subscription-region': options.subscriptionRegion }
    : {}
  return axios.post<any, TranslationResponse>(
    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${options.language}`,
    [{ Text: text }],
    {
      headers: {
        'Ocp-Apim-Subscription-Key': options.subscriptionKey,
        'Content-type': 'application/json',
        'X-ClientTraceId': clientTraceId,
        ...region,
      },
    }
  )
}
