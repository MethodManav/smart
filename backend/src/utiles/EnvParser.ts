import dotenv from "dotenv";
import { IConfig } from "../Types/EnvTypes";

dotenv.config();

export let config: IConfig = {
  x_client_id: process.env.X_CLIENT_ID as string,
  x_client_secret: process.env.X_CLIENT_SECRET as string,
  x_callback: process.env.X_CALLBACK as string,
  x_state: process.env.STATE as string,
  x_url: process.env.X_URL as string,
};
