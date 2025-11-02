import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Role } from '../types'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  universityId?: string | null
  createdAt: string
  profilePicture?: string | null
  gpa?: number | null
  phone?: string
  address?: string
  bio?: string
  dateOfBirth?: string
  currentUniversity?: string
  graduationYear?: number
  major?: string
  interests?: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, role: Role) => Promise<boolean>
  updateUser: (updates: Partial<User>) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem('unichoice_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('unichoice_users') || '[]')
    const foundUser = users.find((u: User & { password?: string }) => u.email === email && u.password === password)
    
    if (foundUser) {
      // Remove password before storing
      const { password: _, ...userData } = foundUser
      setUser(userData as User)
      localStorage.setItem('unichoice_user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const signup = async (email: string, password: string, name: string, role: Role): Promise<boolean> => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('unichoice_users') || '[]')
    if (users.some((u: User & { password: string }) => u.email === email)) {
      return false
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('unichoice_users', JSON.stringify(users))

    // Auto login after signup
    const { password: _, ...userData } = newUser
    setUser(userData as User)
    localStorage.setItem('unichoice_user', JSON.stringify(userData))
    return true
  }

  const updateUser = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('unichoice_user', JSON.stringify(updatedUser))

    // Also update in users array
    const users = JSON.parse(localStorage.getItem('unichoice_users') || '[]')
    const userIndex = users.findIndex((u: User & { password?: string }) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem('unichoice_users', JSON.stringify(users))
    }

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('unichoice_user')
    // Navigation will be handled by components calling logout
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      updateUser,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

