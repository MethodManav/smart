import dotenv from "dotenv";
import { IConfig } from "../Types/EnvTypes";

dotenv.config();

export let config: IConfig = {
  x_client_id: process.env.X_CLIENT_ID as string,
  x_client_secret: process.env.X_CLIENT_SECRET as string,
  x_callback: process.env.X_CALLBACK as string,
  x_state: process.env.STATE as string,
  x_url: process.env.X_URL as string,
  redis_url: process.env.REDIS_URL as string,
  redis_port: parseInt(process.env.REDIS_PORT || "6379", 10),
  client_url: process.env.CLIENT_URL as string,
  linkedIn_url: process.env.LINKEDIN_URL as string,
  linkedIn_clientId: process.env.LINKEDIN_CLIENT as string,
  linkedIn_secret: process.env.LINKEDIN_SECRET as string,
  linkedIn_redirect_url: process.env.LINKEDIN_REDIRECT_URL as string,
};
