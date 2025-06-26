import express, { request, response } from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import Redis from "ioredis";
import { config } from "./utiles/EnvParser";

const app = express();
const port = 5000;

app.use(cors());
app.use(cookieParser());
const redisUrl = process.env.REDIS_PROD_URL ?? "localhost";
const redis = new Redis({
  host: config.redis_url || "localhost",
  port: config.redis_port,
});
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default redis;
