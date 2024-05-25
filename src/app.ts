import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()

//middleware
app.use(express.json())

//application routes
app.use('/api/v1/students', StudentRoute)
app.use('/api/v1/users', UserRoutes)

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('This server is running smoothly')
})

export default app
