export interface Advice {
  id: string
  content: string
  language: string
  author_name: string | null
  author_id: string | null
  type: 'morning' | 'evening' | 'any'
  approved: boolean
  created_at: string
}

export interface Affirmation {
  id: string
  content: string
  language: string
  hour_slot: number
  created_at: string
}

export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  dir: 'ltr' | 'rtl'
}

export type TimeSlot = 'morning' | 'evening'

export type TranslationKey =
  | 'app_name' | 'tagline' | 'home' | 'affirmations_nav' | 'share_wisdom'
  | 'sign_in' | 'sign_up' | 'sign_out' | 'morning_wisdom' | 'evening_reflection'
  | 'next_update' | 'hours' | 'minutes' | 'seconds' | 'from_a_stranger'
  | 'no_advice' | 'hourly_affirmation' | 'next_affirmation' | 'believe'
  | 'choose_language' | 'email' | 'password' | 'your_name' | 'submit_advice'
  | 'advice_placeholder_morning' | 'advice_placeholder_evening' | 'when_to_show'
  | 'morning' | 'evening' | 'anytime' | 'share_btn' | 'success_msg' | 'error_msg'
  | 'loading' | 'login_to_share' | 'already_have_account' | 'need_account'
  | 'select_your_language' | 'affirmation_title' | 'affirmation_subtitle'
  | 'morning_greeting' | 'evening_greeting'
