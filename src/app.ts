import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//middleware
app.use(express.json());

//application routes
app.use('/api/v1/', router);

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('This server is running smoothly');
});

//Global Error Handler
app.use(globalErrorHandler);

//Not Found Error Handling
app.use(notFound);

export default app;
