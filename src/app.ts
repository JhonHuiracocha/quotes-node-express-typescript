import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {
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

  routes(): void {}

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server ready at http://localhost:${this.port}`);
    });
  }
}

export default Server;
