import express, { request, response } from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route";

const app = express();
const port = 5000;

app.use(cors());

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
