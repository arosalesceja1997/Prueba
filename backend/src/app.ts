import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as routes from "./app/routes"

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(routes.routersCompanie.routerCompanie);

export default app;
