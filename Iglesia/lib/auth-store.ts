"use client"

const AUTH_KEY = "parroquia-auth"
const ADMIN_USER = "admin"
const ADMIN_PASS = "admin123" // Default password - should be changed in production

export interface AuthState {
  isAuthenticated: boolean
  user: string | null
}

export function getAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null }
  }
  
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error reading auth state:", error)
  }
  
  return { isAuthenticated: false, user: null }
}

export function login(username: string, password: string): { success: boolean; error?: string } {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const state: AuthState = { isAuthenticated: true, user: username }
    localStorage.setItem(AUTH_KEY, JSON.stringify(state))
    return { success: true }
  }
  
  return { success: false, error: "Usuario o contrasena incorrectos" }
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_KEY)
}

export function isAuthenticated(): boolean {
  return getAuthState().isAuthenticated
}
