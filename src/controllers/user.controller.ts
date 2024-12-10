import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpStatusCodes } from "../utils/http-status-codes";

export class UserController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      res.status(HttpStatusCodes.CREATED).json(user);
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll(req.user);
      res.status(HttpStatusCodes.OK).json(users);
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const user = await this.userService.findById(
        req.user,
        parseInt(req.params.id)
      );

      if (user) {
        res.status(HttpStatusCodes.OK).json(user);
      } else {
        res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: "User not found" });
      }
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      await this.userService.update(
        parseInt(req.params.id),
        req.user,
        req.body
      );
      res.status(HttpStatusCodes.NO_CONTENT).send();
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      await this.userService.deleteById(parseInt(req.params.id), req.user);
      res.status(HttpStatusCodes.NO_CONTENT).send();
    } catch (error: any) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }
}
