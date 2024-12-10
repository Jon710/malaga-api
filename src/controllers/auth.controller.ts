import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpStatusCodes } from "../utils/http-status-codes";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);
    if (token) {
      res.status(HttpStatusCodes.OK).json({ access_token: token });
    } else {
      res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      res.status(HttpStatusCodes.CREATED).json(user);
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }
}
