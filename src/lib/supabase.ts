import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}

export async function getAdvice(language: string, slot: 'morning' | 'evening') {
  const { data } = await supabase
    .from('advice')
    .select('*')
    .eq('language', language)
    .in('type', [slot, 'any'])
    .eq('approved', true)
    .order('created_at', { ascending: true })

  if (!data || data.length === 0) return null
  return data[getDayOfYear() % data.length]
}

export async function getAffirmation(language: string) {
  const hour = new Date().getHours()

  const { data } = await supabase
    .from('affirmations')
    .select('*')
    .eq('language', language)
    .eq('hour_slot', hour)
    .single()

  if (data) return data

  // Fallback: any affirmation in this language
  const { data: fallback } = await supabase
    .from('affirmations')
    .select('*')
    .eq('language', language)
    .limit(1)
    .single()

  return fallback
}

export async function submitAdvice(
  content: string,
  language: string,
  type: 'morning' | 'evening' | 'any',
  authorName: string,
  authorId: string | null
) {
  const { error } = await supabase.from('advice').insert({
    content,
    language,
    type,
    author_name: authorName || null,
    author_id: authorId || null,
    approved: false,
  })
  return !error
}
