/* eslint-disable no-useless-constructor */
import { SkillService } from '../services/skills-service'

export class SkillsController {
  constructor(private readonly skillsService: SkillService) {}
}
