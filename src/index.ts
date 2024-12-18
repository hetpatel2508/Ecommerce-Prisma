import express, { Express } from 'express';
import 'dotenv/config';
import rootRouter from './routes/index';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', rootRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('App listening on port ' + process.env.PORT);
});

