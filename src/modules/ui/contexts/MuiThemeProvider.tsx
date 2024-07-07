'use client'
import theme from '@/modules/ui/constants/theme'
import type { Options } from '@emotion/cache'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
  options: Options
}

export default function MuiThemeProvider(props: Props) {
  const { options, children } = props

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  )
}
