import { AuthResponse } from '../types/authResponse'
import { api } from '../lib/axios'

export type SignInData = {
  email: string
  password: string
}

export async function handleSignInService({ email, password }: SignInData) {
  const { data } = await api.post<AuthResponse>('/auth/signIn', {
    email,
    password,
  })

  return data
}
