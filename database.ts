import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface DatabaseUser {
  id: number
  email: string
  password_hash: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string
}

export interface DatabaseProduct {
  id: number
  name: string
  description?: string
  original_price: number
  current_price: number
  discount_percentage: number
  image_url?: string
  source_url?: string
  source_name: string
  rating: number
  reviews_count: number
  availability: string
  similarity_score: number
  category?: string
  brand?: string
  created_at: string
  updated_at: string
}

export interface DatabaseActivity {
  id: number
  user_id: number
  activity_type: string
  activity_details: string
  savings_amount: number
  created_at: string
}

export class Database {
  // User operations
  static async createUser(email: string, passwordHash: string, firstName: string, lastName: string) {
    const result = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name)
      VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName})
      RETURNING id, email, first_name, last_name, created_at, updated_at
    `
    return result[0] as DatabaseUser
  }

  static async getUserByEmail(email: string) {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `
    return result[0] as DatabaseUser | undefined
  }

  static async getUserById(id: number) {
    const result = await sql`
      SELECT id, email, first_name, last_name, created_at, updated_at 
      FROM users WHERE id = ${id}
    `
    return result[0] as DatabaseUser | undefined
  }

  // Session operations
  static async createSession(userId: number, sessionToken: string, expiresAt: Date) {
    await sql`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (${userId}, ${sessionToken}, ${expiresAt.toISOString()})
    `
  }

  static async getSessionByToken(sessionToken: string) {
    const result = await sql`
      SELECT us.*, u.id as user_id, u.email, u.first_name, u.last_name
      FROM user_sessions us
      JOIN users u ON us.user_id = u.id
      WHERE us.session_token = ${sessionToken} AND us.expires_at > NOW()
    `
    return result[0]
  }

  static async deleteSession(sessionToken: string) {
    await sql`
      DELETE FROM user_sessions WHERE session_token = ${sessionToken}
    `
  }

  // Search history operations
  static async addSearchHistory(userId: number, searchQuery: string, searchType: string, resultsCount: number) {
    await sql`
      INSERT INTO search_history (user_id, search_query, search_type, results_count)
      VALUES (${userId}, ${searchQuery}, ${searchType}, ${resultsCount})
    `
  }

  static async getSearchHistory(userId: number, limit = 10) {
    const result = await sql`
      SELECT * FROM search_history 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return result
  }

  // Product operations
  static async saveProducts(products: DatabaseProduct[]) {
    for (const product of products) {
      await sql`
        INSERT INTO products (
          name, description, original_price, current_price, discount_percentage,
          image_url, source_url, source_name, rating, reviews_count,
          availability, similarity_score, category, brand
        ) VALUES (
          ${product.name}, ${product.description}, ${product.original_price},
          ${product.current_price}, ${product.discount_percentage}, ${product.image_url},
          ${product.source_url}, ${product.source_name}, ${product.rating},
          ${product.reviews_count}, ${product.availability}, ${product.similarity_score},
          ${product.category}, ${product.brand}
        )
        ON CONFLICT (source_url) DO UPDATE SET
          current_price = EXCLUDED.current_price,
          discount_percentage = EXCLUDED.discount_percentage,
          rating = EXCLUDED.rating,
          reviews_count = EXCLUDED.reviews_count,
          availability = EXCLUDED.availability,
          updated_at = CURRENT_TIMESTAMP
      `
    }
  }

  static async searchProducts(query: string, filters: any = {}) {
    let whereClause = `WHERE name ILIKE ${"%" + query + "%"} OR description ILIKE ${"%" + query + "%"}`

    if (filters.category) {
      whereClause += ` AND category = ${filters.category}`
    }

    if (filters.brand) {
      whereClause += ` AND brand = ${filters.brand}`
    }

    if (filters.priceRange) {
      whereClause += ` AND current_price BETWEEN ${filters.priceRange[0]} AND ${filters.priceRange[1]}`
    }

    let orderClause = "ORDER BY similarity_score DESC"

    if (filters.sortBy === "price") {
      orderClause = "ORDER BY current_price ASC"
    } else if (filters.sortBy === "price-desc") {
      orderClause = "ORDER BY current_price DESC"
    } else if (filters.sortBy === "discount") {
      orderClause = "ORDER BY discount_percentage DESC"
    } else if (filters.sortBy === "rating") {
      orderClause = "ORDER BY rating DESC"
    }

    const result = await sql`
      SELECT * FROM products 
      ${sql.unsafe(whereClause)}
      ${sql.unsafe(orderClause)}
      LIMIT 50
    `

    return result as DatabaseProduct[]
  }

  // User activity operations
  static async addUserActivity(userId: number, activityType: string, activityDetails: string, savingsAmount = 0) {
    await sql`
      INSERT INTO user_activities (user_id, activity_type, activity_details, savings_amount)
      VALUES (${userId}, ${activityType}, ${activityDetails}, ${savingsAmount})
    `
  }

  static async getUserActivities(userId: number, limit = 10) {
    const result = await sql`
      SELECT * FROM user_activities 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return result as DatabaseActivity[]
  }

  static async getUserStats(userId: number) {
    const result = await sql`
      SELECT 
        COALESCE(SUM(savings_amount), 0) as total_savings,
        COUNT(CASE WHEN activity_type = 'purchase' THEN 1 END) as total_purchases,
        COUNT(*) as total_activities
      FROM user_activities 
      WHERE user_id = ${userId}
    `
    return result[0]
  }
}
