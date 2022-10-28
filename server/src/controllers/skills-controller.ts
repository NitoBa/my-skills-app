/* eslint-disable no-useless-constructor */
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
      timestamp: new Date().getTime(),
    })
  }

  async push(req: Request, res: Response) {
    const { created, updated, deleted } = req.body

    if (created.length > 0) {
      await this.skillsService.syncCreateSkills(created)
    }
    if (updated.length > 0) {
      await this.skillsService.syncUpdateSkills(created)
    }
    if (deleted.length > 0) {
      await this.skillsService.syncDeletedSkills(created)
    }

    return res.status(201)
  }
}
