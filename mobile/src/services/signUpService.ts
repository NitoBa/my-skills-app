import { AuthResponse } from '../types/authResponse'
import { api } from '../lib/axios'

export type SignUpData = {
  name: string
  email: string
  password: string
}

export async function handleSignUpService({ email, password }: SignUpData) {
  const { data } = await api.post<AuthResponse>('/auth/signUp', {
    name,
    email,
    password,
  })

  return data
}
