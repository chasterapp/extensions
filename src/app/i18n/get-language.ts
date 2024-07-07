import acceptLanguage from 'accept-language'
import { languages, fallbackLng } from './settings'
import { headers } from 'next/headers'

acceptLanguage.languages(languages)

export const getLanguage = () => {
  const lng: string =
    acceptLanguage.get(headers().get('Accept-Language')) || fallbackLng

  return lng
}
