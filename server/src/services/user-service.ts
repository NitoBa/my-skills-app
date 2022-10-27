import { User } from '@prisma/client'
import { prisma } from '../lib/prisma'

export type CreateUserDTO = {
  name: string
  email: string
  password: string
}

export class UserService {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: { name, email, password },
    })
  }
}
