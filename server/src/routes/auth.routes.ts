import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { UserService } from '../services/user-service'

const userService = new UserService()
const authController = new AuthController(userService)

const authRoutes = Router()

authRoutes.post('/signUp', (req, res) => authController.handleSignUp(req, res))
authRoutes.post('/signIn', (req, res) => authController.handleSignIn(req, res))
authRoutes.get('/me', ensureAuthenticated, (req, res) =>
  authController.me(req, res),
)

export { authRoutes }
