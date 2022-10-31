/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

type TokenPayload = {
  email: string
  sub: string
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
    const { sub } = verify(
      accessToken,
      process.env.SECRET_KEY as string,
    ) as TokenPayload

    req.body.userId = sub
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
