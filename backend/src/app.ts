import express, { request, response } from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import Redis from "ioredis";
import { config } from "./utiles/EnvParser";
import { traceMiddleware } from "./utiles/middleware/TraceLogger";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: config.client_url,
    credentials: true,
  })
);
app.use(cookieParser());
const redisUrl = config.redis_url ?? "localhost";
const redis = new Redis(redisUrl);
app.use(traceMiddleware);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default redis;
