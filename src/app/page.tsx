'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import AdviceCard from '@/components/AdviceCard'
import { useApp } from '@/contexts/AppContext'
import { getAdvice } from '@/lib/supabase'
import type { Advice, TimeSlot } from '@/types'
import Link from 'next/link'

function getTimeSlot(): TimeSlot {
  const hour = new Date().getHours()
  return hour >= 4 && hour < 16 ? 'morning' : 'evening'
}

function getNextUpdateTime(slot: TimeSlot): Date {
  const now = new Date()
  const next = new Date(now)
  const hour = now.getHours()

  if (slot === 'morning') {
    next.setHours(16, 0, 0, 0)
  } else if (hour >= 16) {
    next.setDate(next.getDate() + 1)
    next.setHours(4, 0, 0, 0)
  } else {
    next.setHours(4, 0, 0, 0)
  }
  return next
}

export default function Home() {
  const { t, language } = useApp()
  const [advice, setAdvice] = useState<Advice | null>(null)
  const [loading, setLoading] = useState(true)
  const [slot, setSlot] = useState<TimeSlot>('morning')
  const [countdown, setCountdown] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentSlot = getTimeSlot()
    setSlot(currentSlot)
  }, [])

  useEffect(() => {
    if (!mounted) return
    setLoading(true)
    getAdvice(language, slot).then(data => {
      setAdvice(data)
      setLoading(false)
    })
  }, [language, slot, mounted])

  useEffect(() => {
    if (!mounted) return
    const tick = () => {
      const next = getNextUpdateTime(slot)
      const diff = next.getTime() - Date.now()
      if (diff <= 0) { setSlot(getTimeSlot()); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${h}${t('hours')} ${m}${t('minutes')} ${s}${t('seconds')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [slot, t, mounted])

  if (!mounted) return null

  const isMorning = slot === 'morning'
  const hour = new Date().getHours()
  const greeting = isMorning ? t('morning_greeting') : t('evening_greeting')

  return (
    <div className={`min-h-screen transition-colors duration-700 ${
      isMorning ? 'bg-amber-50' : 'bg-violet-50'
    }`}>
      <Header />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-20">
        {/* Greeting */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="text-5xl mb-3">{isMorning ? '🌅' : '🌙'}</div>
          <h1 className="font-serif text-4xl font-semibold text-forest mb-2">
            {greeting}
          </h1>
          <p className="text-gray-500 text-sm">
            {isMorning ? t('morning_wisdom') : t('evening_reflection')}
          </p>
        </div>

        {/* Advice Card */}
        <div className="animate-slide-up">
          {loading ? (
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-forest/10 text-center">
              <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-400 text-sm">{t('loading')}</p>
            </div>
          ) : (
            <AdviceCard advice={advice} slot={slot} />
          )}
        </div>

        {/* Countdown */}
        {countdown && (
          <div className="text-center mt-8 animate-fade-in">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
              {t('next_update')}
            </p>
            <p className={`text-lg font-medium ${
              isMorning ? 'text-amber-600' : 'text-violet-600'
            }`}>
              {countdown}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">{t('tagline')}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/affirmations"
              className="inline-flex items-center gap-2 bg-forest text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-forest-dark transition-colors"
            >
              ✨ {t('affirmations_nav')}
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 border border-forest text-forest rounded-full px-6 py-2.5 text-sm font-medium hover:bg-forest hover:text-white transition-colors"
            >
              🌿 {t('share_wisdom')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
