'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next'
import { useCookies } from 'react-cookie'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

export const i18nPromise = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  })
  .catch(() => null)

type UseTranslationOptions = {
  keyPrefix?: string
}

export function useTranslation(
  ns?: string,
  options: UseTranslationOptions = {},
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
  const [cookies] = useCookies(['i18next'])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const lng: string | undefined = cookies?.i18next

  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    void i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      void i18n.changeLanguage(lng)
    }, [lng, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //   if (cookies.i18next === lng) return
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //   setCookie(cookieName, lng, { path: '/' })
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // }, [lng, cookies.i18next, setCookie])
  }
  return ret
}

export default i18next
