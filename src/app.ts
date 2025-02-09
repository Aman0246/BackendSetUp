import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constants/responseMessage'
import httpError from './utils/httpError'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from './middleware/rateLimit'
const app: Application = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(rateLimit)
app.use('/api/v1', router)
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'));

    } catch (error) {
        httpError(next, error, req, 404)

    }
})
app.use(globalErrorHandler)

export default app

