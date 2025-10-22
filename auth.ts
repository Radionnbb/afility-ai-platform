import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Database } from "./database"
import type { User, AuthResponse } from "./types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const JWT_EXPIRES_IN = "7d"

export class Auth {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(userId: number): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  }

  static verifyToken(token: string): { userId: number } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: number }
    } catch {
      return null
    }
  }

  static async register(email: string, password: string, firstName: string, lastName: string): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await Database.getUserByEmail(email)
      if (existingUser) {
        return { success: false, message: "User already exists with this email" }
      }

      // Hash password
      const passwordHash = await this.hashPassword(password)

      // Create user
      const dbUser = await Database.createUser(email, passwordHash, firstName, lastName)

      // Generate token
      const token = this.generateToken(dbUser.id)

      // Create session
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      await Database.createSession(dbUser.id, token, expiresAt)

      const user: User = {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        createdAt: dbUser.created_at,
        updatedAt: dbUser.updated_at,
      }

      return { success: true, user, token }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "Registration failed" }
    }
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Get user by email
      const dbUser = await Database.getUserByEmail(email)
      if (!dbUser) {
        return { success: false, message: "Invalid email or password" }
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, dbUser.password_hash)
      if (!isValidPassword) {
        return { success: false, message: "Invalid email or password" }
      }

      // Generate token
      const token = this.generateToken(dbUser.id)

      // Create session
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      await Database.createSession(dbUser.id, token, expiresAt)

      const user: User = {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        createdAt: dbUser.created_at,
        updatedAt: dbUser.updated_at,
      }

      return { success: true, user, token }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Login failed" }
    }
  }

  static async getCurrentUser(token: string): Promise<User | null> {
    try {
      const session = await Database.getSessionByToken(token)
      if (!session) {
        return null
      }

      return {
        id: session.user_id,
        email: session.email,
        firstName: session.first_name,
        lastName: session.last_name,
        createdAt: session.created_at,
        updatedAt: session.updated_at,
      }
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  }

  static async logout(token: string): Promise<boolean> {
    try {
      await Database.deleteSession(token)
      return true
    } catch (error) {
      console.error("Logout error:", error)
      return false
    }
  }
}
