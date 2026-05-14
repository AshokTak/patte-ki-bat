'use client'

import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useApp } from '@/contexts/AppContext'
import { submitAdvice } from '@/lib/supabase'
import { LANGUAGES } from '@/lib/languages'

interface Props {
  user: User
}

export default function SubmitForm({ user }: Props) {
  const { t, language } = useApp()
  const [content, setContent] = useState('')
  const [type, setType] = useState<'morning' | 'evening' | 'any'>('any')
  const [authorName, setAuthorName] = useState(
    user.user_metadata?.name || ''
  )
  const [selectedLang, setSelectedLang] = useState(language)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    setStatus('idle')

    const ok = await submitAdvice(content.trim(), selectedLang, type, authorName, user.id)
    setStatus(ok ? 'success' : 'error')
    if (ok) {
      setContent('')
      setType('any')
    }
    setSubmitting(false)
  }

  const placeholder = type === 'morning'
    ? t('advice_placeholder_morning')
    : type === 'evening'
    ? t('advice_placeholder_evening')
    : t('advice_placeholder_morning')

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-forest/10">
      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🌿</div>
          <h3 className="font-serif text-xl text-forest font-semibold mb-2">
            {t('success_msg')}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Your wisdom will appear after a quick review.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="border border-forest text-forest rounded-full px-6 py-2 text-sm hover:bg-forest hover:text-white transition-colors"
          >
            Share another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type selector */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">{t('when_to_show')}</label>
            <div className="flex gap-2">
              {(['morning', 'evening', 'any'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setType(opt)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                    type === opt
                      ? 'bg-forest text-white'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {opt === 'morning' ? `🌅 ${t('morning')}` : opt === 'evening' ? `🌙 ${t('evening')}` : `✨ ${t('anytime')}`}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <textarea
              required
              maxLength={280}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={placeholder}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-forest transition-colors resize-none font-serif text-base leading-relaxed"
            />
            <p className="text-xs text-gray-300 text-right mt-1">
              {content.length}/280
            </p>
          </div>

          {/* Author name */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t('your_name')}</label>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Anonymous"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-forest transition-colors"
            />
          </div>

          {/* Language */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t('choose_language')}</label>
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

          {status === 'error' && (
            <p className="text-xs text-red-500 bg-red-50 rounded-xl px-4 py-2">{t('error_msg')}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="w-full bg-forest text-white rounded-full py-3 text-sm font-medium hover:bg-forest-dark transition-colors disabled:opacity-50"
          >
            {submitting ? t('loading') : `🌿 ${t('share_btn')}`}
          </button>
        </form>
      )}
    </div>
  )
}
