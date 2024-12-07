import express, { Express } from 'express';
import 'dotenv/config';
import rootRouter from './routes/index';

const app: Express = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT);
});
