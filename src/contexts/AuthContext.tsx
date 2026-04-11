import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthTokens, LoginCredentials } from '@/types/nepa'
import { API_CONFIG, getHeaders, getAuthHeaders } from '@/config/api'

interface AuthContextType {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'nepa_access_token',
  REFRESH_TOKEN: 'nepa_refresh_token',
  USER: 'nepa_user',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER)

    if (storedToken && storedUser) {
      setAccessToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.login}`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(credentials),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }))
        throw new Error(errorData.message || 'Login failed')
      }

      const data: { user: User; tokens: AuthTokens } = await response.json()

      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.accessToken)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refreshToken)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user))

      setAccessToken(data.tokens.accessToken)
      setUser(data.user)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)

    setAccessToken(null)
    setUser(null)
    setError(null)
  }

  const refresh = async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)

    if (!refreshToken) {
      logout()
      throw new Error('No refresh token available')
    }

    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.refresh}`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ refreshToken }),
        }
      )

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data: { tokens: AuthTokens } = await response.json()

      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.accessToken)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refreshToken)

      setAccessToken(data.tokens.accessToken)
    } catch (err) {
      logout()
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        error,
        login,
        logout,
        refresh,
      }}
    >
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
