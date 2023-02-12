import express, { Express } from 'express';
import dotenv from 'dotenv';
import { BusinessRoutes } from './routes/business-route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

BusinessRoutes.setRoutes(app); // todo, add default error handler middleware

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
