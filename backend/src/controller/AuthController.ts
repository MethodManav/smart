import { Request, Response } from "express";
import { auth } from "twitter-api-sdk";
import { config } from "../utiles/EnvParser";

class AuthController {
  protected client_id: string;
  protected client_secret: string;
  protected callbackUrl: string;
  protected authClient: any;

  constructor(client_id: string, client_secret: string, callback: string) {
    (this.client_id = client_id),
      (this.client_secret = client_secret),
      (this.callbackUrl = callback);
    this.authClient = new auth.OAuth2User({
      client_id: this.client_id,
      client_secret: this.client_secret,
      callback: this.callbackUrl,
      scopes: ["tweet.read", "users.read", "offline.access"],
    });
  }
  public async getAccessToken(req: any, res: any) {
    try {
      const { code, state } = req.query;
      if (state !== config.x_state)
        return res.status(500).send("State isn't matching");
      await this.authClient.requestAccessToken(code as string);
      res.redirect("/tweets");
    } catch (error) {
      console.error(error);
    }
  }
  public async login(req: Request, res: Response) {
    const authUrl = this.authClient.generateAuthURL({
      state: config.x_state,
      code_challenge_method: "s256",
    });
    res.redirect(authUrl);
  }

  public async checkHealth(req: Request, res: Response) {
    res.send("Wroking Fine ");
  }
}

export const authController = new AuthController(
  config.x_client_id,
  config.x_client_secret,
  config.x_callback
);
