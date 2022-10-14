import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";
import * as routes from "./routes";

class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {
    users: "/api/users",
    quotes: "/api/quotes",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use(this.apiRoutes.users, routes.userRoutes);
    this.app.use(this.apiRoutes.quotes, routes.quoteRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server ready at http://localhost:${this.port}`);
    });
  }
}

export default Server;
