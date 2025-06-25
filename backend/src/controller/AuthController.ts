import { Request, Response } from "express";
import { auth } from "twitter-api-sdk";
import { config } from "../utiles/EnvParser";
import axios from "axios";
import Oauth from "oauth-1.0a";
import * as crypto from "crypto";
import redis from "../app";

class AuthController {
  protected client_id: string;
  protected client_secret: string;
  protected callbackUrl: string;
  protected authClient;

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
  public async checkHealth(req: Request, res: Response) {
    res.send("Wroking Fine ");
  }
  public async requestToken(req: Request, res: Response) {
    console.log();
    const oauth = new Oauth({
      consumer: {
        key: config.x_client_id,
        secret: config.x_client_secret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });
    try {
      const request_data = {
        url: `${config.x_url}request_token`,
        method: "POST",
        data: null,
      };
      const authHeader = oauth.toHeader(oauth.authorize(request_data));
      const response = await axios.post(request_data.url, null, {
        headers: {
          ...authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      res.json(`${config.x_url}/authorize?${response.data}`);
    } catch (error) {
      console.error(error);
    }
  }
  public async getAccessToken(req: Request, res: Response) {
    const oauthToken = req.query.oauth_token;
    const authVerifier = req.query.oauth_verifier;
    const oauth = new Oauth({
      consumer: {
        key: config.x_client_id,
        secret: config.x_client_secret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });

    try {
      const request_data = {
        url: `${config.x_url}access_token`,
        method: "POST",
        data: {
          oauth_token: oauthToken,
          oauth_verifier: authVerifier,
        },
      };
      const authHeader = oauth.toHeader(oauth.authorize(request_data));
      const response = await axios.post(request_data.url, null, {
        headers: {
          ...authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const userData = response.data.split("&");
      redis.set(
        `session:${userData[2].split("=")[1]}`,
        JSON.stringify({
          token: userData[0].split("=")[1],
          secret: userData[1].split("=")[1],
        })
      );
      res.cookie("sessionId", userData[2].split("=")[1], {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    } catch (error) {
      console.error(error);
    }
  }

  // public async postTweet(req:Request,res:Response){
  //   try {
  //   } catch (error) {

  //   }
  // }
}

export const authController = new AuthController(
  config.x_client_id,
  config.x_client_secret,
  config.x_callback
);
