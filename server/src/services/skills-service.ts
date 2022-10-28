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
    const skills = await prisma.skill.findMany({
      where: {
        updatedAt: {
          gte: new Date(lastPulledAt),
        },
      },
    })

    return skills
  }

  async listByCreated(lastPulledAt: number) {
    const skills = await prisma.skill.findMany({
      where: {
        createdAt: {
          gte: new Date(lastPulledAt),
        },
      },
    })

    return skills
  }

  async syncCreateSkills(skills: Skills[]): Promise<void> {
    for await (const skill of skills) {
      await prisma.skill.create({
        data: {
          id: skill.id,
          title: skill.title,
          type: skill.type,
          createdAt: skill.createdAt,
          updatedAt: skill.updatedAt,
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

  async syncDeletedSkills(skills: Skills[]): Promise<void> {
    for await (const skill of skills) {
      await prisma.skill.delete({
        where: { id: skill.id },
      })
    }
  }
}
