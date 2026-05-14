'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useApp } from '@/contexts/AppContext'
import { supabase } from '@/lib/supabase'
import LanguagePicker from './LanguagePicker'
import AuthModal from './AuthModal'

export default function Header() {
  const { t, user } = useApp()
  const [showLang, setShowLang] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🌿</span>
            <div>
              <span className="font-serif font-semibold text-forest text-base leading-tight block">
                {t('app_name')}
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-5">
            <Link href="/" className="text-sm text-gray-500 hover:text-forest transition-colors">
              {t('home')}
            </Link>
            <Link href="/affirmations" className="text-sm text-gray-500 hover:text-forest transition-colors">
              {t('affirmations_nav')}
            </Link>
            <Link href="/submit" className="text-sm text-gray-500 hover:text-forest transition-colors">
              {t('share_wisdom')}
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLang(true)}
              className="w-8 h-8 flex items-center justify-center text-lg hover:scale-110 transition-transform rounded-full hover:bg-gray-100"
              aria-label={t('choose_language')}
            >
              🌐
            </button>
            {user ? (
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-xs text-forest border border-forest/30 rounded-full px-3 py-1.5 hover:bg-forest hover:text-white transition-colors"
              >
                {t('sign_out')}
              </button>
            ) : (
              <button
                onClick={() => { setAuthMode('signin'); setShowAuth(true) }}
                className="text-xs bg-forest text-white rounded-full px-3 py-1.5 hover:bg-forest-dark transition-colors"
              >
                {t('sign_in')}
              </button>
            )}
          </div>
        </div>
      </header>

      {showLang && <LanguagePicker onClose={() => setShowLang(false)} />}
      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onToggleMode={() => setAuthMode(m => m === 'signin' ? 'signup' : 'signin')}
        />
      )}
    </>
  )
}
