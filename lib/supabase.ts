import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Database types
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  created_at: string
  updated_at?: string
}

export interface SearchHistory {
  id: string
  user_id: string
  query: string
  search_type: "text" | "image" | "url"
  results_count: number
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discounted_price: number
  store: string
  url: string
  image_url: string
  category: string
  rating: number
  reviews_count: number
  created_at: string
}
