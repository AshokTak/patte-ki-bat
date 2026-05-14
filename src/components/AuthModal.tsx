'use client'

import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { supabase } from '@/lib/supabase'
import { LANGUAGES } from '@/lib/languages'

interface Props {
  mode: 'signin' | 'signup'
  onClose: () => void
  onToggleMode: () => void
}

export default function AuthModal({ mode, onClose, onToggleMode }: Props) {
  const { t, language, setLanguage } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [selectedLang, setSelectedLang] = useState(language)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, preferred_language: selectedLang },
          },
        })
        if (err) throw err
        setLanguage(selectedLang)
        setDone(true)
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
        onClose()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('error_msg'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm p-6 shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {done ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="font-serif text-xl font-semibold text-forest mb-2">Check your email!</h2>
            <p className="text-sm text-gray-500 mb-6">We\'ve sent a confirmation link to {email}</p>
            <button onClick={onClose} className="bg-forest text-white rounded-full px-8 py-2.5 text-sm font-medium">
              Got it
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-xl font-semibold text-forest mb-5">
              {mode === 'signin' ? t('sign_in') : t('sign_up')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">{t('your_name')}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-forest transition-colors"
                    placeholder="Maya"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t('email')}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-forest transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t('password')}</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-forest transition-colors"
                  placeholder="••••••"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">{t('select_your_language')}</label>
                  <select
                    value={selectedLang}
                    onChange={e => setSelectedLang(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-forest transition-colors bg-white"
                  >
                    {LANGUAGES.map(l => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.nativeName} ({l.name})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-500 bg-red-50 rounded-xl px-4 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-forest text-white rounded-full py-3 text-sm font-medium hover:bg-forest-dark transition-colors disabled:opacity-50"
              >
                {submitting ? t('loading') : (mode === 'signin' ? t('sign_in') : t('sign_up'))}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              {mode === 'signin' ? t('need_account') : t('already_have_account')}{' '}
              <button onClick={onToggleMode} className="text-forest font-medium hover:underline">
                {mode === 'signin' ? t('sign_up') : t('sign_in')}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
