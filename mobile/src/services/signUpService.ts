import { SignUpResponse } from '../types/signUpResponse'
import { api } from '../lib/axios'

export type SignUpData = {
  email: string
  password: string
}

export async function handleSignUpService({ email, password }: SignUpData) {
  const { data } = await api.post<SignUpResponse>('/oauth/register', {
    email,
    password,
  })

  if (data.httpStatusCode !== 200) throw new Error('Error on signUp')

  return data
}
