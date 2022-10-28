import { Router } from 'express'
import { SkillsController } from '../controllers/skills-controller'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { SkillService } from '../services/skills-service'

const skillRoutes = Router()

const service = new SkillService()
const controller = new SkillsController(service)

skillRoutes.get('/sync/pull/:lastPulledAt', ensureAuthenticated, (req, res) =>
  controller.pull(req, res),
)
skillRoutes.post('/sync/pull/', ensureAuthenticated, (req, res) =>
  controller.push(req, res),
)

export { skillRoutes }
