'use client'

import { useApp } from '@/contexts/AppContext'
import type { Advice, TimeSlot } from '@/types'

interface Props {
  advice: Advice | null
  slot: TimeSlot
}

export default function AdviceCard({ advice, slot }: Props) {
  const { t } = useApp()
  const isMorning = slot === 'morning'

  if (!advice) {
    return (
      <div className={`rounded-3xl p-10 text-center border ${
        isMorning
          ? 'bg-amber-50 border-amber-100'
          : 'bg-violet-50 border-violet-100'
      }`}>
        <p className="text-gray-400 text-sm">{t('no_advice')}</p>
      </div>
    )
  }

  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-sm border ${
      isMorning
        ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100'
        : 'bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100'
    }`}>
      {/* Decorative quote mark */}
      <div className={`absolute top-6 left-6 text-7xl font-serif leading-none opacity-10 ${
        isMorning ? 'text-amber-400' : 'text-violet-400'
      }`}>
        &ldquo;
      </div>

      <div className="relative px-8 pt-12 pb-8">
        <p className={`font-serif text-2xl leading-relaxed text-gray-800 ${
          advice.language === 'ar' ? 'text-right' : 'text-left'
        }`}>
          {advice.content}
        </p>

        <div className={`mt-6 flex items-center gap-2 ${
          advice.language === 'ar' ? 'flex-row-reverse' : ''
        }`}>
          <div className={`w-6 h-0.5 rounded-full ${
            isMorning ? 'bg-amber-300' : 'bg-violet-300'
          }`} />
          <p className="text-sm text-gray-400">
            {advice.author_name || t('from_a_stranger')}
          </p>
        </div>
      </div>

      {/* Bottom tag */}
      <div className={`px-8 pb-6`}>
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
          isMorning
            ? 'bg-amber-100 text-amber-700'
            : 'bg-violet-100 text-violet-700'
        }`}>
          {isMorning ? '🌅' : '🌙'}
          {isMorning ? t('morning') : t('evening')}
        </span>
      </div>
    </div>
  )
}
