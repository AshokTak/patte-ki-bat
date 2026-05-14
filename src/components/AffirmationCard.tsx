'use client'

import { useApp } from '@/contexts/AppContext'
import type { Affirmation } from '@/types'

interface Props {
  affirmation: Affirmation | null
}

const hourEmojis: Record<number, string> = {
  0: '🌙', 1: '🌙', 2: '🌙', 3: '🌙',
  4: '🌅', 5: '🌅', 6: '☀️', 7: '☀️',
  8: '☀️', 9: '☀️', 10: '☀️', 11: '☀️',
  12: '⚡', 13: '⚡', 14: '⚡', 15: '🌝',
  16: '🌝', 17: '🌞', 18: '🌞', 19: '🌆',
  20: '🌆', 21: '🌆', 22: '🌙', 23: '🌙',
}

export default function AffirmationCard({ affirmation }: Props) {
  const { t } = useApp()
  const hour = new Date().getHours()
  const emoji = hourEmojis[hour] || '✨'

  if (!affirmation) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-violet-100 shadow-sm">
        <p className="font-serif text-xl text-gray-600 italic">
          {t('believe')}
        </p>
      </div>
    )
  }

  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-violet-100">
      {/* Gradient top bar */}
      <div className="h-1.5 bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400" />

      {/* Decorative */}
      <div className="absolute top-8 right-8 text-6xl opacity-10">✨</div>

      <div className="px-8 pt-10 pb-8">
        <div className="text-3xl mb-6">{emoji}</div>

        <p className={`font-serif text-2xl leading-relaxed text-gray-800 ${
          affirmation.language === 'ar' ? 'text-right' : 'text-left'
        }`}>
          {affirmation.content}
        </p>

        <div className="mt-8 h-px bg-violet-50" />

        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-300 animate-pulse" />
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            {t('hourly_affirmation')}
          </p>
        </div>
      </div>
    </div>
  )
}
