import * as dotenv from 'dotenv'
import express from 'express'
import { authRoutes } from './routes/auth.routes'
import { skillRoutes } from './routes/skills.routes'
dotenv.config()

const app = express()
app.use(express.json())
app.use(authRoutes)
app.use(skillRoutes)

const PORT = 3333

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
