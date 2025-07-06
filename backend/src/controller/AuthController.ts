import { Request, Response } from "express";
import { auth } from "twitter-api-sdk";
import { config } from "../utiles/EnvParser";
import axios from "axios";
import Oauth from "oauth-1.0a";
import * as crypto from "crypto";
import redis from "../app";
import qs from "qs";

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
        secure: false,
        sameSite: "none",
      });
      const redirectUrl = config.client_url ?? `http://localhost:3000`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error(error);
    }
  }

  public async getSession(req: Request, res: Response): Promise<any> {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      res.status(200).json({
        message: "Not Connected to Twitter",
      });
    }
    const sessionData = await redis.get(`session:${sessionId}`);
    if (!sessionData) {
      return res.status(401).json({ message: "Session not found" });
    }
    res.status(200).json({
      message: "Twitter Is Connected",
      succes: true,
    });
  }

  // public async linkedInAccessCode(req: Request, res: Response) {
  //   try {
  //     console.log("ghj");
  //     const queryParams = qs.stringify({
  //       response_type: "code",
  //       client_id: config.linkedIn_clientId,
  //       redirect_uri: config.linkedIn_redirect_url,
  //       scope: "r_liteprofile r_emailaddress w_member_social",
  //     });
  //     const AccessCode = await axios.get(
  //       `${config.linkedIn_url}authorization?${queryParams}`
  //     );
  //     console.log(AccessCode.config.url, "code");
  //     res.status(200).json({
  //       messsage: AccessCode.config.url,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       message: " Something went wrong ",
  //     });
  //   }
  //   // try {
  //   //   // const tokenResponse = await axios.post(
  //   //   //   `${config.linkedIn_url}accessToken`,
  //   //   //   qs.stringify({
  //   //   //     grant_type: "authorization_code",
  //   //   //     code: code,
  //   //   //     redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
  //   //   //     client_id: process.env.LINKEDIN_CLIENT_ID,
  //   //   //     client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  //   //   //   }),
  //   //   //   {
  //   //   //     headers: {
  //   //   //       "Content-Type": "application/x-www-form-urlencoded",
  //   //   //     },
  //   //   //   }
  //   //   // );

  //   //   // if (tokenResponse) {
  //   //   //   return res.status(200).json({
  //   //   //     success: true,
  //   //   //     accessToken: tokenResponse.data.access_token,
  //   //   //   });
  //   //   // }

  //   //   return res.status(400).json({
  //   //     success: false,
  //   //     message: "Something went wrong",
  //   //   });
  //   // } catch (error: any) {
  //   //   console.error("LinkedIn token error:", error.message);
  //   //   return res.status(500).json({
  //   //     success: false,
  //   //     message: "Internal server error",
  //   //   });
  //   // }
  // }

  // public async linkedInAccessToken(req: Request, res: Response) {
  //   // try {
  //   //   const code = req.query.code;
  //   //   const tokenResponse = await axios.post(
  //   //     `${config.linkedIn_url}accessToken`,
  //   //     qs.stringify({
  //   //       grant_type: "authorization_code",
  //   //       code: code,
  //   //       redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
  //   //       client_id: process.env.LINKEDIN_CLIENT_ID,
  //   //       client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  //   //     }),
  //   //     {
  //   //       headers: {
  //   //         "Content-Type": "application/x-www-form-urlencoded",
  //   //       },
  //   //     }
  //   //   );
  //   //   if (tokenResponse) {
  //   //   }
  //   // } catch (error) {}
  //   res.send("Success");
  // }
}

export const authController = new AuthController(
  config.x_client_id,
  config.x_client_secret,
  config.x_callback
);
