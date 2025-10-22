import { supabase, supabaseAdmin } from "./supabase"

export class FreeTierAuth {
  async register(email: string, password: string, name: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabaseAdmin.from("users").insert({
          id: data.user.id,
          email,
          name,
          created_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }
      }

      return { user: data.user }
    } catch (error) {
      console.error("Registration error:", error)
      return { error: "خطأ في التسجيل" }
    }
  }

  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: "بيانات الدخول غير صحيحة" }
      }

      return { user: data.user, session: data.session }
    } catch (error) {
      console.error("Login error:", error)
      return { error: "خطأ في تسجيل الدخول" }
    }
  }

  async logout() {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      return { error: "خطأ في تسجيل الخروج" }
    }
  }

  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        return null
      }

      // Get user profile
      const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

      return {
        id: user.id,
        email: user.email,
        name: profile?.name || "User",
      }
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  }
}
