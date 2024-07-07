export const fallbackLng = 'en'
export const languages = [fallbackLng, 'fr']
export const cookieName = 'i18next'
export const defaultNS = 'translation'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng: fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
