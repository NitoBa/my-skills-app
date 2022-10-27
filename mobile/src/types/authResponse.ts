import { User } from './user'

export type AuthResponse = {
  accessToken: string
  user: User
}
