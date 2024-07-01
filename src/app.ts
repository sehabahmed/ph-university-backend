import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
//application routes
app.use('/api/v1/', router);

// const frontServer = http://localhost:5173/




// app.get('/', (req: Request, res: Response) => {
//   res.send('This server is running smoothly');
// });

//test

const test = async (req: Request, res: Response) => {
  // Promise.reject();

  const a = 90;
  res.send(a)
}

app.get('/', test)

//Global Error Handler
app.use(globalErrorHandler);

//Not Found Error Handling
app.use(notFound);

export default app;
