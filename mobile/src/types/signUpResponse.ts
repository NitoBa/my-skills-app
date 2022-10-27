export type SignUpResponse = {
  errors: string[]
  returnTokenVM: {
    accessToken: string
  }
  httpStatusCode: number
}
