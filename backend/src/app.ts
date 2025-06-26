import express, { request, response } from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import Redis from "ioredis";
import cookieParser from "cookie-parser";
import { config } from "./utiles/EnvParser";

const app = express();
const port = 5000;

app.use(cors());
app.use(cookieParser());

const redis = new Redis({
  host: config.redis_url || "localhost",
});
export default redis;
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
