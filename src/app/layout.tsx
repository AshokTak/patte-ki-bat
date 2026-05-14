import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/contexts/AppContext'

export const metadata: Metadata = {
  title: 'Patte Ki Baat — Wisdom from Strangers',
  description: 'Daily morning & evening wisdom from real people around the world, plus hourly affirmations — in 10 languages.',
  keywords: 'wisdom, advice, affirmations, motivation, multilingual, daily wisdom',
  openGraph: {
    title: 'Patte Ki Baat',
    description: 'Wisdom from strangers, delivered daily',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
