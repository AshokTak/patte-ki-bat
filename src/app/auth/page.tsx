'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useApp } from '@/contexts/AppContext'

export default function AuthPage() {
  const { user } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [user, router])

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
