import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import UserRoutes from './routers/UserRoutes.js';
import connection from "./config/sequelize.js";
import AuthRoutes from './routers/AuthRoutes.js';
import jwtAuthentications from './middleware/JwtAuthentication.js';
import MailTemplateRoutes from "./routers/MailTemplateRoutes.js";
dotenv.config();
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }
  protected async routes(): Promise<void> {
    this.app.route("/").get((req: Request, res: Response) => {
      res.json({message : "success running api"})
    });
    this.app.use("/users", jwtAuthentications, UserRoutes);
    this.app.use("/mailTemplates", jwtAuthentications, MailTemplateRoutes);
    this.app.use("/auth", AuthRoutes);
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }
}
const app = new App().app;
const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server is running on port ${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
void start();