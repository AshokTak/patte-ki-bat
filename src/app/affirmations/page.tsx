'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import AffirmationCard from '@/components/AffirmationCard'
import { useApp } from '@/contexts/AppContext'
import { getAffirmation } from '@/lib/supabase'
import type { Affirmation } from '@/types'

function getNextHourTime(): Date {
  const next = new Date()
  next.setHours(next.getHours() + 1, 0, 0, 0)
  return next
}

export default function AffirmationsPage() {
  const { t, language } = useApp()
  const [affirmation, setAffirmation] = useState<Affirmation | null>(null)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState('')
  const [mounted, setMounted] = useState(false)
  const [currentHour, setCurrentHour] = useState(0)

  useEffect(() => {
    setMounted(true)
    setCurrentHour(new Date().getHours())
  }, [])

  useEffect(() => {
    if (!mounted) return
    setLoading(true)
    getAffirmation(language).then(data => {
      setAffirmation(data)
      setLoading(false)
    })
  }, [language, currentHour, mounted])

  useEffect(() => {
    if (!mounted) return
    const tick = () => {
      const next = getNextHourTime()
      const diff = next.getTime() - Date.now()
      if (diff <= 0) {
        const newHour = new Date().getHours()
        setCurrentHour(newHour)
        return
      }
      const m = Math.floor(diff / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${m}${t('minutes')} ${s}${t('seconds')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [t, mounted, currentHour])

  if (!mounted) return null

  const hourLabel = mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-20">
        {/* Title */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="text-5xl mb-3">✨</div>
          <h1 className="font-serif text-4xl font-semibold text-forest mb-2">
            {t('affirmation_title')}
          </h1>
          <p className="text-gray-500 text-sm">
            {t('affirmation_subtitle')}
          </p>
        </div>

        {/* Affirmation Card */}
        <div className="animate-slide-up">
          {loading ? (
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-violet-100 text-center">
              <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-400 text-sm">{t('loading')}</p>
            </div>
          ) : (
            <AffirmationCard affirmation={affirmation} />
          )}
        </div>

        {/* Countdown */}
        {countdown && (
          <div className="text-center mt-8 animate-fade-in">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
              {t('next_affirmation')}
            </p>
            <p className="text-lg font-medium text-violet-600">
              {countdown}
            </p>
          </div>
        )}

        {/* Current time */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-300">{hourLabel}</p>
        </div>
      </main>
    </div>
  )
}
