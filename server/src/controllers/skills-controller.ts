/* eslint-disable no-useless-constructor */
import { addMilliseconds } from 'date-fns'
import { Request, Response } from 'express'
import { SkillService } from '../services/skills-service'

export class SkillsController {
  constructor(private readonly skillsService: SkillService) {}

  async pull(req: Request, res: Response) {
    const { lastPulledAt } = req.params

    const updated = await this.skillsService.listByUpdated(+lastPulledAt)
    const created = await this.skillsService.listByCreated(+lastPulledAt)

    const skills = {
      updated,
      created,
      deleted: [],
    }

    return res.status(200).json({
      changes: {
        skills,
      },
      timestamp: addMilliseconds(Date.now(), 200).getTime(),
    })
  }

  async push(req: Request, res: Response) {
    const {
      skills: { created, updated, deleted },
      userId,
    } = req.body

    console.log(created)
    console.log(updated)
    console.log(deleted)

    if (created.length > 0) {
      await this.skillsService.syncCreateSkills(created, userId)
    }
    if (updated.length > 0) {
      await this.skillsService.syncUpdateSkills(updated)
    }
    if (deleted.length > 0) {
      await this.skillsService.syncDeletedSkills(deleted)
    }

    return res.status(201)
  }
}
