import { AuthResponse } from '../types/authResponse'
import { api } from '../lib/axios'

export type SignUpData = {
  email: string
  password: string
}

export async function handleSignUpService({ email, password }: SignUpData) {
  const { data } = await api.post<AuthResponse>('/auth/signUp', {
    email,
    password,
  })

  return data
}
