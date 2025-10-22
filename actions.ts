"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Auth } from "./auth"
import { Database } from "./database"
import { ProductSearchService } from "./product-search"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  try {
    const result = await Auth.login(email, password)

    if (result.success && result.token) {
      const cookieStore = await cookies()
      cookieStore.set("auth-token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      redirect("/search")
    }

    return result
  } catch (error) {
    console.error("Login action error:", error)
    return { success: false, message: "Login failed" }
  }
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  if (!email || !password || !firstName || !lastName) {
    return { success: false, message: "All fields are required" }
  }

  try {
    const result = await Auth.register(email, password, firstName, lastName)

    if (result.success && result.token) {
      const cookieStore = await cookies()
      cookieStore.set("auth-token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      redirect("/search")
    }

    return result
  } catch (error) {
    console.error("Register action error:", error)
    return { success: false, message: "Registration failed" }
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (token) {
      await Auth.logout(token)
    }

    cookieStore.delete("auth-token")
    redirect("/")
  } catch (error) {
    console.error("Logout action error:", error)
  }
}

export async function searchAction(formData: FormData) {
  const query = formData.get("query") as string
  const searchType = formData.get("searchType") as string

  if (!query || !searchType) {
    return { success: false, message: "Query and search type are required" }
  }

  try {
    let searchResult

    switch (searchType) {
      case "name":
        searchResult = await ProductSearchService.searchByName(query)
        break
      case "url":
        searchResult = await ProductSearchService.searchByUrl(query)
        break
      case "image":
        searchResult = await ProductSearchService.searchByImage(query)
        break
      default:
        return { success: false, message: "Invalid search type" }
    }

    // Log search if user is authenticated
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (token) {
      const user = await Auth.getCurrentUser(token)
      if (user) {
        await Database.addSearchHistory(user.id, query, searchType, searchResult.totalCount)
        await Database.addUserActivity(user.id, "search", `Searched for: ${query}`, 0)
      }
    }

    return { success: true, data: searchResult }
  } catch (error) {
    console.error("Search action error:", error)
    return { success: false, message: "Search failed" }
  }
}
