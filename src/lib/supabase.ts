import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          age: number | null
          weight: number | null
          height: number | null
          goal: string | null
          workout_frequency: string | null
          target_weight: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          age?: number | null
          weight?: number | null
          height?: number | null
          goal?: string | null
          workout_frequency?: string | null
          target_weight?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          age?: number | null
          weight?: number | null
          height?: number | null
          goal?: string | null
          workout_frequency?: string | null
          target_weight?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}