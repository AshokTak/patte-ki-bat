'use client'

import { useApp } from '@/contexts/AppContext'
import { LANGUAGES } from '@/lib/languages'

interface Props {
  onClose: () => void
}

export default function LanguagePicker({ onClose }: Props) {
  const { language, setLanguage, t } = useApp()

  const handleSelect = (code: string) => {
    setLanguage(code)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm p-6 shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="font-serif text-xl font-semibold text-forest mb-1">
          {t('choose_language')}
        </h2>
        <p className="text-sm text-gray-400 mb-5">{t('select_your_language')}</p>

        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all ${
                language === lang.code
                  ? 'bg-forest text-white shadow-sm'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <div>
                <p className="text-sm font-medium leading-tight">{lang.nativeName}</p>
                <p className={`text-xs leading-tight ${
                  language === lang.code ? 'text-green-200' : 'text-gray-400'
                }`}>
                  {lang.name}
                </p>
              </div>
              {language === lang.code && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  )
}
