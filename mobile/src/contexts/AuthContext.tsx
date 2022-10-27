import { User } from '../types/user'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import {
  getAccessToken,
  saveToken,
  clearAccessToken,
} from '../storage/handleAccessToken'
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
} from '../storage/handleUser'

type AuthContextData = {
  user: User | null
  handleSaveUserCredentials: (accessToken: string, user: User) => void
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
    async (accessToken: string, user: User) => {
      await saveToken(accessToken)
      setUser(user)
      setIsLoggedIn('logged')
    },
    [],
  )

  const verifyIfUserLoggedIn = useCallback(async () => {
    try {
      const response = await getAccessToken()
      if (response) {
        const user = await getUserFromLocalStorage()
        setUser(user)
        setIsLoggedIn('logged')
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

  useEffect(() => {
    if (user) {
      setUserToLocalStorage(user)
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, handleSaveUserCredentials, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
