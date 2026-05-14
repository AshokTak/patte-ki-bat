'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import SubmitForm from '@/components/SubmitForm'
import AuthModal from '@/components/AuthModal'
import { useApp } from '@/contexts/AppContext'

export default function SubmitPage() {
  const { t, user, loading } = useApp()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup')

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-20">
        <div className="text-center mb-10 animate-fade-in">
          <div className="text-5xl mb-3">🌿</div>
          <h1 className="font-serif text-4xl font-semibold text-forest mb-2">
            {t('submit_advice')}
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Your words could be the wisdom someone needs tomorrow morning.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : user ? (
          <div className="animate-slide-up">
            <SubmitForm user={user} />
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-forest/10 text-center">
              <div className="text-4xl mb-4">🔑</div>
              <p className="text-gray-600 mb-6 font-medium">{t('login_to_share')}</p>
              <button
                onClick={() => { setAuthMode('signup'); setShowAuth(true) }}
                className="bg-forest text-white rounded-full px-8 py-3 font-medium hover:bg-forest-dark transition-colors mr-3"
              >
                {t('sign_up')}
              </button>
              <button
                onClick={() => { setAuthMode('signin'); setShowAuth(true) }}
                className="border border-forest text-forest rounded-full px-8 py-3 font-medium hover:bg-forest hover:text-white transition-colors"
              >
                {t('sign_in')}
              </button>
            </div>
          </div>
        )}
      </main>

      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onToggleMode={() => setAuthMode(m => m === 'signin' ? 'signup' : 'signin')}
        />
      )}
    </div>
  )
}
