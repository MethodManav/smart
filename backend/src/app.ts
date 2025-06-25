import express, { request, response } from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import Redis from "ioredis";
import cookieParser from "cookie-parser";

const app = express();
const port = 5000;

app.use(cors());
app.use(cookieParser());

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});
export default redis;
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
