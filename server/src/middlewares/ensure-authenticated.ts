/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserService } from '../services/user-service'

const userService = new UserService()

type TokenPayload = {
  email: string
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { headers } = req

  const authorization = headers.authorization
  if (!authorization) {
    return res.status(400).json({
      error: 'Missing authorization header',
    })
  }

  const [Bearer, accessToken] = authorization.split(' ')

  if (!Bearer || accessToken === 'undefined') {
    return res.status(400).json({ error: 'Invalid Token Format' })
  }

  try {
    const { email } = verify(
      accessToken,
      process.env.SECRET_KEY as string,
    ) as TokenPayload

    const user = await userService.findByEmail(email)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    req.body.email = user.email
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
