import { User } from '../types/user'
import { JWTResponse } from '../types/jwtResponse'
import {
  createContext,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import jwtDecoder from 'jwt-decode'
import {
  getAccessToken,
  saveToken,
  clearAccessToken,
} from '../storage/handleAccessToken'

type AuthContextData = {
  user: User | null
  handleSaveUserCredentials: (accessToken: string, email: string) => void
  handleLogout: () => void
  isLoggedIn: 'idle' | 'logged' | 'notLogged'
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<'idle' | 'logged' | 'notLogged'>(
    'idle',
  )

  const handleSaveUserCredentials = useCallback(
    async (accessToken: string, email: string) => {
      await saveToken(accessToken)
      setUser({ email })
      setIsLoggedIn('logged')
    },
    [],
  )

  const verifyIfUserLoggedIn = useCallback(async () => {
    try {
      const response = await getAccessToken()
      if (response) {
        setIsLoggedIn('logged')
        const { email } = jwtDecoder<JWTResponse>(response)
        setUser({ email })
      } else {
        setIsLoggedIn('notLogged')
      }
    } catch (error) {
      setIsLoggedIn('notLogged')
    }
  }, [])

  const handleLogout = useCallback(async () => {
    await clearAccessToken()
    setUser(null)
    setIsLoggedIn('notLogged')
  }, [])

  useLayoutEffect(() => {
    verifyIfUserLoggedIn()
  }, [verifyIfUserLoggedIn])

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, handleSaveUserCredentials, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
