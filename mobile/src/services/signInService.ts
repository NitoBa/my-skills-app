import { SignInResponse } from '../types/signInResponse'
import { api } from '../lib/axios'

export type SignInData = {
  email: string
  password: string
}

export async function handleSignInService({ email, password }: SignInData) {
  const { data } = await api.post<SignInResponse>('/oauth/token', {
    email,
    password,
  })

  if (data.httpStatusCode !== 200) throw new Error('Error on signIn')

  return data
}
