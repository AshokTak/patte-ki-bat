'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { translations } from '@/lib/i18n'
import { DEFAULT_LANGUAGE } from '@/lib/languages'
import type { TranslationKey } from '@/types'

interface AppContextType {
  language: string
  setLanguage: (lang: string) => void
  user: User | null
  loading: boolean
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const AppContext = createContext<AppContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  user: null,
  loading: true,
  t: (key) => key,
  isRTL: false,
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('pkb-language')
    if (saved) setLanguageState(saved)

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang)
    localStorage.setItem('pkb-language', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [])

  const t = useCallback((key: TranslationKey): string => {
    const trans = translations[language as keyof typeof translations] || translations.en
    return (trans as Record<string, string>)[key] ||
      (translations.en as Record<string, string>)[key] || key
  }, [language])

  return (
    <AppContext.Provider value={{ language, setLanguage, user, loading, t, isRTL: language === 'ar' }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
