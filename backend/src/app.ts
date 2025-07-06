import express, { request, response } from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import Redis from "ioredis";
import { config } from "./utiles/EnvParser";
import { traceMiddleware } from "./utiles/middleware/TraceLogger";

const app = express();
const port = 5000;

app.use(cors());
app.use(cookieParser());
const redisUrl = process.env.REDIS_PROD_URL ?? "localhost";
const redis = new Redis({
  host: config.redis_url ?? "localhost",
  port: config.redis_port ?? 6379,
});
app.use(traceMiddleware);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default redis;
