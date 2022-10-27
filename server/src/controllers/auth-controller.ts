import { Request, Response } from 'express'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UserService } from '../services/user-service'
import { User } from '@prisma/client'

export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(public readonly userService: UserService) {}

  async handleSignUp(req: Request, res: Response) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'missing name, email or password',
      })
    }

    const userAlreadyExists = await this.userService.findByEmail(email)

    if (userAlreadyExists) {
      return res.status(404).json({ error: 'User already exists' })
    }

    const passwordHashed = await hash(password, 10)

    const newUser = await this.userService.create({
      name,
      email,
      password: passwordHashed,
    })

    const accessToken = sign(
      { sub: newUser.id, email: newUser.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '10 days',
      },
    )

    return res.status(201).json({
      accessToken,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  }

  async handleSignIn(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email or password incorrect' })
    }

    const userExists = await this.userService.findByEmail(email)

    if (!userExists) {
      return res.status(404).json({ error: 'User does not exist' })
    }

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Email or password incorrect' })
    }

    const accessToken = sign(
      { sub: userExists.id, email: userExists.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '10 days',
      },
    )

    return res.status(200).json({
      accessToken,
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
    })
  }

  async me(req: Request, res: Response) {
    const { email } = req.body

    const user: Partial<User | null> = await this.userService.findByEmail(email)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    delete user.password

    return res.status(200).json({ ...user })
  }
}
