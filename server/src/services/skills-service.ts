import { prisma } from '../lib/prisma'

type Skills = {
  id: string
  title: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export class SkillService {
  async listByUpdated(lastPulledAt: number) {
    const skills =
      await prisma.$queryRaw`SELECT * FROM skills WHERE updatedAt >= ${lastPulledAt} AND updatedAt != createdAt`

    return skills
  }

  async listByCreated(lastPulledAt: number) {
    const skills =
      await prisma.$queryRaw`SELECT * FROM skills WHERE createdAt >= ${lastPulledAt} AND updatedAt = createdAt`

    return skills
  }

  async syncCreateSkills(skills: Skills[], id: string): Promise<void> {
    for await (const skill of skills) {
      await prisma.skill.upsert({
        create: {
          watermelon_id: skill.id,
          title: skill.title,
          type: skill.type,
          createdAt: skill.createdAt,
          updatedAt: skill.updatedAt,
          user: {
            connect: {
              id,
            },
          },
        },
        where: {
          watermelon_id: skill.id,
        },
        update: {
          title: skill.title,
        },
      })
    }
  }

  async syncUpdateSkills(skills: Skills[]): Promise<void> {
    for await (const skill of skills) {
      await prisma.skill.update({
        where: { id: skill.id },
        data: {
          title: skill.title,
          updatedAt: skill.updatedAt,
        },
      })
    }
  }

  async syncDeletedSkills(ids: string[]): Promise<void> {
    for await (const id of ids) {
      await prisma.skill.delete({
        where: { watermelon_id: id },
      })
    }
  }
}
