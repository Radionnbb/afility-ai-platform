import { supabase } from "./supabase"
import type { User } from "./types"

export class FreeTierAuth {
  // تسجيل مستخدم جديد
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) {
        return { success: false, message: error.message }
      }

      return {
        success: true,
        user: data.user,
        message: "Please check your email to confirm your account",
      }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, message: "Registration failed" }
    }
  }

  // تسجيل الدخول
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, message: error.message }
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      }
    } catch (error) {
      console.error("Signin error:", error)
      return { success: false, message: "Login failed" }
    }
  }

  // تسجيل الخروج
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      return { success: !error }
    } catch (error) {
      console.error("Signout error:", error)
      return { success: false }
    }
  }

  // الحصول على المستخدم الحالي
  static async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        return null
      }

      return {
        id: user.id,
        email: user.email!,
        firstName: user.user_metadata.first_name || "",
        lastName: user.user_metadata.last_name || "",
        createdAt: user.created_at,
        updatedAt: user.updated_at || user.created_at,
      } as User
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  }
}
